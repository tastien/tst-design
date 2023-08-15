import { TimeInterval } from '@tastien/tstd';
import { Button, Form } from 'antd';
import moment from 'moment';
import React from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log(`value is: ${value}`);
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      initialValues={{
        times: [[moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')]],
      }}
    >
      <TimeInterval
        formItemProps={{
          required: true,
          rules: [{ required: true, message: '请选择时段' }],
          name: 'times',
        }}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
