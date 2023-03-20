import { Button, Col, Input, Modal, ModalProps, Row, Spin, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';

import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
  DownloadOutlined,
  InfoCircleFilled,
  LoadingOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { useState } from 'react';
import './index.less';

export enum ImportStatusEnum {
  /** 上传中 */
  process = 'PROCESS',
  /** 失败 */
  fail = 'FAIL',
  /** 部分成功 */
  partSuccess = 'PART_SUCCESS',
  /** 成功 */
  success = 'SUCCESS',
  /** 默认状态 选择文件 */
  pickFile = 'PICK_FILE',
}

type normalStatus = {
  status: 'FAIL' | 'PROCESS' | 'PICK_FILE';
  [k: string]: any;
};
type partSucStatus = {
  status: 'PART_SUCCESS';
  url: string;
  failMsg?: string;
  total: number;
  failLength: number;
};
type sucStatus = {
  status: 'SUCCESS';
  total: number;
  [k: string]: any;
};

type UploadRes = {
  failExcelUrl?: string;
  failCount?: number;
  successCount: number;
};

export type IStatusRender = normalStatus | partSucStatus | sucStatus;

const StatusRender = ({
  status,
  total,
  failLength,
  failMsg,
  url,
  onClose,
}: IStatusRender & { onClose: () => void }) => {
  const processJsx = (
    <div
      className={classnames(
        'tst-import-excel-modal-flex',
        'tst-import-excel-modal-align_middle',
      )}
    >
      <Spin className="tst-import-excel-modal-spin" />
      数据批量导入中，请耐心等待...
    </div>
  );

  const failJsx = (
    <div>
      <div
        className={classnames(
          'tst-import-excel-modal-flex',
          'tst-import-excel-modal-align_middle',
        )}
      >
        <CloseCircleFilled className="tst-import-excel-modal-fail" />
        {failMsg ? failMsg : '导入失败,请使用正确的导入模版'}
      </div>
      <div
        className={classnames(
          'tst-import-excel-modal-flex',
          'tst-import-excel-modal-justify_end',
        )}
      >
        <Button onClick={onClose} type="primary">
          确定
        </Button>
      </div>
    </div>
  );

  const partSuccessJsx = (
    <div>
      <div
        className={classnames(
          'tst-import-excel-modal-flex',
          'tst-import-excel-modal-flex_column',
        )}
      >
        <div className="tst-import-excel-modal-flex">
          <InfoCircleFilled className="tst-import-excel-modal-warning" />
          <span>
            共有 <span className="tst-import-excel-modal-red">{total}条</span>{' '}
            数据，其中
            <span className="tst-import-excel-modal-red">{failLength}条</span>
            <br />
            数据导入失败，请下载失败文件查看详情
          </span>
        </div>
        <a className="tst-import-excel-modal-download" href={url} download>
          <DownloadOutlined className="tst-import-excel-modal-icon" />
          下载失败列表
        </a>
      </div>
      <div
        className={classnames(
          'tst-import-excel-modal-flex',
          'tst-import-excel-modal-justify_end',
        )}
      >
        <Button onClick={onClose} type="primary">
          确定
        </Button>
      </div>
    </div>
  );

  const successJsx = (
    <div>
      <div
        className={classnames(
          'tst-import-excel-modal-flex',
          'tst-import-excel-modal-align_middle',
        )}
      >
        <CheckCircleFilled className="tst-import-excel-modal-success" />
        成功导入<span className="tst-import-excel-modal-red">
          {total}条
        </span>{' '}
        数据
      </div>
      <div
        className={classnames(
          'tst-import-excel-modal-flex',
          'tst-import-excel-modal-justify_end',
        )}
      >
        <Button onClick={onClose} type="primary">
          确定
        </Button>
      </div>
    </div>
  );

  const content = {
    [ImportStatusEnum.pickFile]: null,
    [ImportStatusEnum.process]: processJsx,
    [ImportStatusEnum.fail]: failJsx,
    [ImportStatusEnum.partSuccess]: partSuccessJsx,
    [ImportStatusEnum.success]: successJsx,
  };

  return content[status];
};

interface IProps {
  modalTitle?: React.ReactNode;
  visible: boolean;
  onClose: (refresh: boolean) => void;
  /** 下载模版 */
  templateUrl?: string;
  downloadTemplate?: () => Promise<string>;
  /** 上传接口 */
  upload: (file: UploadFile) => Promise<UploadRes>;
}

const ImportModal = ({
  modalTitle,
  onClose,
  visible,
  upload,
  templateUrl,
  downloadTemplate,
}: IProps) => {
  const [file, setFile] = React.useState<UploadFile>();
  const [downloadLoading, setDownloadLoading] = React.useState<boolean>(false);
  const [statusData, setStatusData] = useState<IStatusRender>({
    status: ImportStatusEnum.pickFile,
  });

  const { status } = statusData;
  const uploadingStatus = status !== ImportStatusEnum.pickFile;

  const submitHandle = async () => {
    try {
      setStatusData({ ...statusData, status: ImportStatusEnum.process });

      if (!!file) {
        let res: any;
        res = await upload(file);
        const status = res?.failExcelUrl
          ? ImportStatusEnum.partSuccess
          : res?.failCount
          ? ImportStatusEnum.fail
          : ImportStatusEnum.success;

        setStatusData({
          ...statusData,
          status,
          total: (res.successCount || 0) + (res.failCount || 0),
          url: res.failExcelUrl,
          failLength: res.failCount,
        });
      }
    } catch (e: any) {
      setStatusData({
        ...statusData,
        status: ImportStatusEnum.fail,
        failMsg: e?.msg,
      });
    }
  };

  const resetFileHandle = () => {
    setFile(undefined);
  };

  let modalProps: ModalProps = {
    title: modalTitle || '批量导入',
    bodyStyle: { padding: '24px 0 0 0' },
  };
  if (uploadingStatus) {
    modalProps = {
      title: '',
      closable: false,
    };
  }

  const onClosImportExcelModale = (refresh: boolean) => {
    setStatusData({ status: ImportStatusEnum.pickFile });
    onClose(refresh);
  };

  return (
    <Modal
      {...modalProps}
      width={500}
      footer={null}
      open={visible}
      destroyOnClose={true}
      onCancel={() => onClosImportExcelModale(false)}
      afterClose={resetFileHandle}
    >
      {uploadingStatus ? (
        StatusRender({
          ...statusData,
          onClose: () => onClosImportExcelModale(true),
        })
      ) : (
        <>
          <Row style={{ margin: '0 24px' }}>
            <Col flex={1}>
              <Row align="middle">
                <span>导入Excel数据文件: </span>
                <Input
                  readOnly
                  value={file?.name}
                  className="tst-import-excel-modal-input"
                  addonBefore={
                    file && (
                      <PaperClipOutlined className="tst-import-excel-modal-input-before" />
                    )
                  }
                  suffix={
                    !!file && (
                      <span onClick={resetFileHandle}>
                        <CloseCircleOutlined color="#ccc" />
                      </span>
                    )
                  }
                  addonAfter={
                    <Upload
                      maxCount={1}
                      accept=".xlsx"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={({ file }) => setFile(file)}
                    >
                      <Button>选择文件</Button>
                    </Upload>
                  }
                />
              </Row>
            </Col>
            <Col offset={7}>
              {downloadTemplate ? (
                <a
                  className="tst-import-excel-modal-download-template"
                  onClick={async () => {
                    setDownloadLoading(true);
                    const res = await downloadTemplate();
                    setDownloadLoading(false);
                    window.open(res);
                  }}
                >
                  {downloadLoading ? (
                    <LoadingOutlined className="tst-import-excel-modal-download-template-icon" />
                  ) : (
                    <DownloadOutlined className="tst-import-excel-modal-download-template-icon" />
                  )}
                  下载导入模版
                </a>
              ) : (
                <a
                  href={templateUrl}
                  target="_blank"
                  download
                  className="tst-import-excel-modal-download-template"
                  rel="noreferrer"
                >
                  <DownloadOutlined className="tst-import-excel-modal-download-template-icon" />
                  下载导入模版
                </a>
              )}
            </Col>
          </Row>
          <Row
            justify="end"
            align="middle"
            className="tst-import-excel-modal-footer"
          >
            <Button
              type="primary"
              onClick={() => submitHandle()}
              disabled={!file}
            >
              开始导入
            </Button>
          </Row>
        </>
      )}
    </Modal>
  );
};

ImportModal.defaultProps = {
  statusData: {
    status: ImportStatusEnum.pickFile,
  },
};

export default ImportModal;
