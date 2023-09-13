import { ModalForm } from '@tastien/tstd';
import { Button, Form, Input } from 'antd';
import React from 'react';

const App: React.FC = () => {
  return (
    <ModalForm
      trigger={<Button type="primary">隐藏 footer</Button>}
      modalProps={{
        title: 'hideFooterModalForm',
        footer: null,
      }}
    >
      <Form.Item name="name" label="label">
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default App;
