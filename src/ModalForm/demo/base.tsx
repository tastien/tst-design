import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React, { useRef } from 'react';

type DataType = {
  name: string;
};

const App: React.FC = () => {
  const formRef = useRef(null);

  const someAsyncFunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loading');
      }, 1000);
    });
  };

  return (
    <ModalForm<DataType>
      trigger={<Button type="primary">ModalForm</Button>}
      ref={formRef}
      onFinish={async (value) => {
        await someAsyncFunction();
        console.log(value, 'onFinish');
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
