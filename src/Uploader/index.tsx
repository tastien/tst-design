import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Spin, Tooltip, Upload } from 'antd';
import {
  UploadFile,
  UploadProps as AntUploadProps,
} from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import classNames from 'classnames';
import update from 'immutability-helper';
import _ from 'lodash';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import tokenUtils from '../utils/tokenUtils';
import { checkFile, isSuccResponse } from '../utils/utils';
import FileUpload from './FileUpload';

import './index.less';

const type = 'DragableUploadList';

interface DragableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile;
  fileList: UploadFile[];
  moveRow: (dragIndex: any, hoverIndex: any) => void;
}

const DragableUploadListItem = ({
  originNode,
  moveRow,
  file,
  fileList,
}: DragableUploadListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = (
    <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>
  );
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${
        isOver ? dropClassName : ''
      }`}
      style={{ cursor: 'move' }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

const getBase64 = (file: File | Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export interface UploadProps extends Omit<AntUploadProps, 'onChange'> {
  limitSize?: number;
  uploading?: boolean;
  setUploading?: (value: boolean) => void; // 多张图片的情况下，记得要设置setUploading
  isSingle?: boolean;
  resetValue?: string[] | string;
  value?: string[] | string;
  additionalData?: any;
  onChange?: (values: string[] | string) => void;
  children?: ReactNode;
  fileName?: string;
}

type CompoundedComponent = UploadProps & {
  FileUpload?: typeof FileUpload;
};

const Uploader = ({
  accept,
  action,
  maxCount = 20,
  multiple,
  disabled,
  listType = 'picture-card',
  limitSize = 5,
  beforeUpload,
  showUploadList,
  uploading = false,
  setUploading,
  value,
  onChange,
  resetValue,
  isSingle,
  additionalData = null,
  children,
  className,
}: CompoundedComponent) => {
  const [previewObj, setPreview] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  });

  const [fileList, setFileList] = useState<
    Pick<UploadFile, 'uid' | 'status' | 'url'>[]
  >([]);

  useEffect(() => {
    if (typeof value === 'string' && isSingle) {
      return setFileList([{ uid: '1', status: 'done', url: value }]);
    }
    if (Array.isArray(value) && value.length) {
      setFileList(() => {
        return value.map((url, idx) => ({
          uid: String(idx + 1),
          name: String(idx + 1),
          status: 'done',
          url,
        }));
      });
    }
    if (value === undefined) {
      setFileList([]);
    }
  }, [value]);

  const handleCancel = () => {
    setPreview({ ...previewObj, previewVisible: false });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file!.originFileObj!)) as string;
    }
    setPreview({
      previewImage: (file.url || file.preview) as string,
      previewVisible: true,
      previewTitle: file.name || '图片预览',
    });
  };

  const handleChange = ({ fileList }: UploadChangeParam) => {
    let batchLoading = false;
    fileList.forEach((item, idx) => {
      const { status, response } = item;
      if (!status) {
        fileList[idx] = { ...item, status: 'error' };
      }

      if (status === 'uploading') batchLoading = true;
      if (status === 'done' && response) {
        if (!isSuccResponse(response)) {
          fileList[idx] = {
            ...item,
            status: 'error',
            response: response.msg,
          };
          return;
        }
        fileList[idx] = {
          ...item,
          status: response.result ? 'done' : 'error',
          url: response.result,
        };
      }
    });
    if (!!setUploading) {
      setUploading(batchLoading);
    }
    setFileList(fileList);
    if (!batchLoading) {
      const list = _.compact(fileList.map((file) => file.url));
      if (onChange) {
        onChange(isSingle ? list[0] : list);
      }
    }
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = fileList[dragIndex];
      const newList = update(fileList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      setFileList(newList);
      const list: string[] = _.compact(
        newList.map((file: { url: string }) => file.url),
      );
      if (onChange) {
        onChange(isSingle ? list[0] : list);
      }
    },
    [fileList],
  );

  return (
    <>
      <Space align="end">
        <DndProvider backend={HTML5Backend}>
          <Upload
            accept={accept}
            data={additionalData}
            headers={{ 'user-token': tokenUtils.getToken() }}
            beforeUpload={
              beforeUpload
                ? beforeUpload
                : (file: File) => checkFile(file, limitSize)
            }
            action={action}
            multiple={multiple}
            listType={listType}
            fileList={fileList as any}
            onPreview={handlePreview}
            onChange={handleChange}
            disabled={disabled || uploading}
            showUploadList={showUploadList}
            className={classNames('loadImg', className)}
            itemRender={(originNode, file, currFileList) => (
              <DragableUploadListItem
                originNode={originNode}
                file={file}
                fileList={currFileList}
                moveRow={moveRow}
              />
            )}
          >
            {fileList.length >= maxCount
              ? null
              : children || (
                  <div>
                    <Spin spinning={uploading}>
                      <CloudUploadOutlined />
                      <div> 点击上传</div>
                    </Spin>
                  </div>
                )}
          </Upload>
        </DndProvider>
        {resetValue && (
          <Button
            type="primary"
            onClick={() => {
              if (onChange) {
                onChange(resetValue as string[]);
              }
            }}
          >
            重置
          </Button>
        )}
      </Space>

      <Modal
        open={previewObj.previewVisible}
        title={previewObj.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: '100%' }}
          src={previewObj.previewImage}
        />
      </Modal>
    </>
  );
};

Uploader.FileUpload = FileUpload;

export default Uploader;
