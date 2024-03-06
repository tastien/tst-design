import { AvailableTime } from '@tastien/tstd';
import { Form } from 'antd';
import React from 'react';

const App: React.FC = () => {
  return (
    <Form>
      <AvailableTime maxCount={5} />
    </Form>
  );
};

export default App;
