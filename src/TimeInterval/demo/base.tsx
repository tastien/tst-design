import { Button, Form } from 'antd';
import React from 'react';
import { TimeInterval } from 'tstd';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log(value.openTimes);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <TimeInterval />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
