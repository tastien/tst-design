import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { IFormRef } from '..';

type DataType = {
  name: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<IFormRef<DataType>>(null);

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
    <ModalForm<DataType>
      ref={formRef}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            formRef.current?.openModal();
          }}
        >
          自定义 footer
        </Button>
      }
      onFinish={async (value) => {
        await someAsyncFunction();
        console.log(value, 'onFinish');
        formRef.current?.closeModal();
        setLoading(false);
      }}
      modalProps={{
        title: 'customFooterModalForm',
        footer: [
          <Button
            key="cancel"
            onClick={() => {
              formRef.current?.closeModal();
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
