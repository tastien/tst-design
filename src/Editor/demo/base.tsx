import { Editor } from '@tastien/tstd';
import { Button, Form } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const rules = [
    {
      validator: (_: any, value: string, cb: (arg0?: string) => void) => {
        if (!value || value === '<p></p>') {
          return cb('请输入图文内容');
        }
        cb();
      },
    },
  ];

  const changeEditorValue = (value: any) => {
    form.setFieldsValue({
      content: value,
    });
  };

  const onFinish = (value: any) => {
    console.log(value);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.content !== curValues.content
        }
      >
        {() => {
          const content = form.getFieldValue('content');
          const value = content ? content : '';
          return (
            <Form.Item required rules={rules} name="content" label="图文内容">
              <Editor value={value} onChange={changeEditorValue} />
            </Form.Item>
          );
        }}
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
