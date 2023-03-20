import { Form } from 'antd';
import React from 'react';
import { InputLevel } from 'tstd';

const App = () => {
  const [form] = Form.useForm();
  const onFinish = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <Form
        labelAlign="left"
        form={form}
        name="firstScreenAdForm"
        onFinish={onFinish}
      >
        <InputLevel
          form={form}
          file={{
            orderName: 'order',
            topName: 'top',
          }}
        />
      </Form>
    </>
  );
};

export default App;
