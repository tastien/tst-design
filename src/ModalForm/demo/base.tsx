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

  const loading = async () => {
    await someAsyncFunction();
  };

  return (
    <ModalForm
      trigger={<Button type="primary">ModalForm</Button>}
      onFinish={async (e) => {
        await loading();
        console.log(e, 'onFinish');
      }}
      modalProps={{
        async onOk(e) {
          await loading();
          console.log(e, 'onOk');
        },
        onCancel() {
          console.log('onCancel');
        },
      }}
    >
      <Form.Item name="name" label="label">
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default App;
