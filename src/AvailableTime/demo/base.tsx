import { AvailableTime } from '@tastien/tstd';
import { Button, Form } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log(value);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <AvailableTime />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
