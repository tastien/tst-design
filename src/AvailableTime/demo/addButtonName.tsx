import { AvailableTime } from '@tastien/tstd';
import { Form } from 'antd';
import React from 'react';

const App: React.FC = () => {
  return (
    <Form>
      <AvailableTime addButtonName="添加用餐时间" />
    </Form>
  );
};

export default App;
