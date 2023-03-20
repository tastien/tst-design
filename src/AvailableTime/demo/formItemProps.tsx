import { Button, Form } from 'antd';
import React from 'react';
import { AvailableTime } from 'tstd';

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
    >
      <AvailableTime
        formItemProps={{
          fullTime: {
            name: 'fullTime',
            label: '售卖时间',
            style: {
              marginBottom: 60,
            },
          },
          weeks: {
            name: 'saleWeeks',
            label: '售卖周期',
            style: {
              marginBottom: 60,
            },
          },
          times: {
            name: 'saleTimes',
            label: '售卖时段',
            required: true,
            rules: [{ required: true, message: '请选择售卖时段' }],
            style: {
              marginBottom: 60,
            },
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
