import { ModalForm } from '@tastien/tstd';
import { Form, Input, Table } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const someAsyncFunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loading');
      }, 1000);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Table
        columns={[
          {
            title: '名字',
            dataIndex: 'name',
            width: 90,
          },
          {
            title: '年龄',
            dataIndex: 'age',
            width: 90,
          },
          {
            title: '操作',
            width: 90,
            render(_, record) {
              return (
                <a
                  onClick={() => {
                    form.setFieldsValue({ name: record.name, age: record.age });
                    setOpen(true);
                  }}
                >
                  编辑
                </a>
              );
            },
          },
        ]}
        dataSource={[
          { name: '小明', age: 11 },
          { name: '小红', age: 12 },
          { name: '小军', age: 13 },
        ]}
      />
      <ModalForm
        form={form}
        onFinish={async (e) => {
          await someAsyncFunction();
          setOpen(false);
          console.log(e, 'onFinish');
        }}
        modalProps={{
          open: open,
          onCancel() {
            handleCancel();
            console.log('onCancel');
          },
        }}
      >
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <Input />
        </Form.Item>
      </ModalForm>
    </div>
  );
};

export default App;
