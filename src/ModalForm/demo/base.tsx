import { Button, Form, Input } from 'antd';
import React from 'react';
import ModalForm from '..';

const App: React.FC = () => {
  return (
    <>
      <ModalForm
        trigger={<Button>ModalForm</Button>}
        onFinish={(e) => {
          console.log(e, 'onFinish');
        }}
        modalProps={{
          onOk(e) {
            console.log(e, 'onOk');
          },
          onCancel(e) {
            console.log(e, 'onCancel');
          },
        }}
      >
        <Form.Item name="name" label="label">
          <Input />
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default App;
