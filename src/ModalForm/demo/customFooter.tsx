import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { ModalFormRef } from '..';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<ModalFormRef>();

  const someAsyncFunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loading');
      }, 1000);
    });
  };

  const handleOk = async () => {
    setLoading(true);
    await someAsyncFunction();
    formRef.current?.submit();
  };

  return (
    <ModalForm
      formRef={formRef}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            formRef.current?.setController({ open: true });
          }}
        >
          自定义 footer
        </Button>
      }
      onFinish={async (e) => {
        await someAsyncFunction();
        console.log(e, 'onFinish');
        formRef.current?.setController({ open: false });
        setLoading(false);
      }}
      modalProps={{
        title: 'customFooterModalForm',
        footer: [
          <Button
            key="cancel"
            onClick={() => {
              formRef.current?.setController({ open: false });
              formRef.current?.resetFields();
            }}
            disabled={loading}
          >
            取消
          </Button>,
          <Button
            key="reset"
            onClick={() => formRef.current?.resetFields()}
            disabled={loading}
          >
            重置
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={loading}
          >
            确定
          </Button>,
        ],
      }}
    >
      <Form.Item name="name" label="label">
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default App;
