import { AvailableTime } from '@tastien/tstd';
import { Button, Form } from 'antd';
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
    >
      <AvailableTime
        formItemProps={{
          fullTime: {
            name: 'date',
            label: '营业时间',
          },
          weeks: {
            name: 'wwek',
            wrapperCol: { offset: 8 },
          },
          times: {
            name: 'time',
            wrapperCol: { offset: 8 },
            required: true,
          },
        }}
        radioGroupProps={{
          options: [
            {
              label: '与门店营业时间保持一致',
              value: true,
            },
            {
              label: '单独设置外卖营业时间',
              value: false,
            },
          ],
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
