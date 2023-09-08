import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <ModalForm
      form={form}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          自定义 footer
        </Button>
      }
      onFinish={async (e) => {
        await someAsyncFunction();
        console.log(e, 'onFinish');
        setOpen(false);
        setLoading(false);
      }}
      modalProps={{
        open: open,
        onCancel() {
          handleCancel();
        },
        footer: [
          <Button key="cancel" onClick={handleCancel} disabled={loading}>
            取消
          </Button>,
          <Button
            key="reset"
            onClick={() => form.resetFields()}
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
