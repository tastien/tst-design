import { MultipleOptionItem } from '@tastien/tstd';
import { Form } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const params = {
      [values.searchType]: values.keyword,
    };
    console.log(params, 'params');
  };
  return (
    <Form
      form={form}
      layout="inline"
      initialValues={{ searchType: 'name' }}
      onFinish={onFinish}
    >
      <MultipleOptionItem
        options={[
          { name: '商品名称', value: 'name' },
          { name: '商品ID', value: 'id' },
        ]}
        inputItemName="keyword"
        optionItemName="searchType"
        label="商品信息"
        inputStyle={{ maxWidth: 300 }}
        selectProps={{ style: { minWidth: '10em' } }}
        maxLength={40}
      />
    </Form>
  );
};

export default App;
