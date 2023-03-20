import { Button, Form } from 'antd';
import React from 'react';
import { TimeInterval } from 'tstd';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log(`value is:`, value);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <TimeInterval maxCount={5} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
