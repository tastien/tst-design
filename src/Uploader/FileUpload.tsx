import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import _ from 'lodash';
import * as React from 'react';
import { UploadProps } from '.';
import tokenUtils from '../utils/tokenUtils';
import { checkFile, isSuccResponse } from '../utils/utils';
import './index.less';

const FileUploader = ({
  accept,
  action,
  multiple,
  disabled,
  limitSize = 5,
  beforeUpload,
  showUploadList,
  uploading = false,
  setUploading,
  value,
  onChange,
  isSingle,
  additionalData = null,
  className,
  fileName = '',
  maxCount = 1,
}: UploadProps) => {
  const [fileList, setFileList] = React.useState<
    Pick<UploadFile, 'uid' | 'status' | 'url' | 'name'>[]
  >([]);

  const tempFileName = React.useRef(fileName);

  React.useEffect(() => {
    if (typeof value === 'string' && value && isSingle) {
      return setFileList([
        { uid: '1', status: 'done', name: tempFileName.current, url: value },
      ]);
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
  }, [value]);

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
    if (setUploading) setUploading(batchLoading);
    setFileList(fileList as any);
    if (isSingle) {
      tempFileName.current = fileList?.[0]?.name;
    }
    if (!batchLoading) {
      const list = _.compact(fileList.map((file) => file.url));
      if (onChange) onChange(isSingle ? list[0] : list);
    }
  };

  return (
    <Upload
      accept={accept}
      data={additionalData}
      headers={{ 'user-token': tokenUtils.getToken() }}
      beforeUpload={
        beforeUpload ? beforeUpload : (file: File) => checkFile(file, limitSize)
      }
      action={action}
      multiple={multiple}
      fileList={fileList as any}
      onChange={handleChange}
      disabled={disabled || uploading}
      showUploadList={showUploadList}
      className={className}
      maxCount={maxCount}
    >
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  );
};

export default FileUploader;
