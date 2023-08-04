import { ColorPickerValue, PickerColor } from '@tastien/tstd';
import { Button, Form } from 'antd';
import React from 'react';

const App = () => {
  const initialValues = { color: '#b62021' };
  const handleOnFinish = (values: { color: ColorPickerValue }) => {
    console.log(values);
  };

  return (
    <Form onFinish={handleOnFinish} initialValues={initialValues}>
      <Form.Item label="Colorpicker" name="color">
        <PickerColor />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
