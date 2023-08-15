import { AvailableTime } from '@tastien/tstd';
import { Button, Form } from 'antd';
import moment from 'moment';
import React from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log('value is:', value);
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        saleTimes: [[moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')]],
      }}
    >
      <AvailableTime
        formItemProps={{
          fullTime: {
            name: 'fullTime',
            label: '售卖时间',
          },
          weeks: {
            name: 'saleWeeks',
            wrapperCol: { offset: 8 },
          },
          times: {
            name: 'saleTimes',
            required: true,
            wrapperCol: { offset: 8 },
            rules: [{ required: true, message: '请选择售卖时段' }],
          },
        }}
      />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
