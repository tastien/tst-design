import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const someAsyncFunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loading');
      }, 1000);
    });
  };

  return (
    <ModalForm
      trigger={<Button type="primary">自定义按钮样式</Button>}
      onFinish={async (value) => {
        await someAsyncFunction();
        console.log(value, 'onFinish');
      }}
      modalProps={{
        title: 'footerTypeModalForm',
        okButtonProps: {
          style: {
            backgroundColor: 'skyblue',
            borderColor: 'skyblue',
          },
        },
        cancelButtonProps: {
          style: {
            backgroundColor: 'yellow',
            borderColor: 'yellow',
          },
        },
        okText: '提交',
      }}
    >
      <Form.Item name="name" label="label">
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default App;
