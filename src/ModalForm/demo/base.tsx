import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React, { useRef } from 'react';
import { ModalFormRef } from '..';

const App: React.FC = () => {
  const formRef = useRef<ModalFormRef>();

  const someAsyncFunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loading');
      }, 1000);
    });
  };

  return (
    <ModalForm
      trigger={<Button type="primary">ModalForm</Button>}
      formFef={formRef}
      onFinish={async (e) => {
        await someAsyncFunction();
        console.log(e, 'onFinish');
      }}
      modalProps={{
        title: 'baseModalForm',
      }}
    >
      <Form.Item name="name" label="label">
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default App;
