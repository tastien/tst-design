import { ModalForm } from '@tastien/tstd';
import { Form, Input, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { ModalFormRef } from '..';

const App: React.FC = () => {
  const [data, setData] = useState<{ name: string; age: number }[]>([
    { name: '小明', age: 11 },
    { name: '小红', age: 12 },
    { name: '小军', age: 13 },
  ]);
  const formRef = useRef<ModalFormRef>();

  const someAsyncFunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loading');
      }, 1000);
    });
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
            render(_, record, idx) {
              return (
                <a
                  onClick={() => {
                    formRef.current?.setFieldsValue({
                      name: record.name,
                      age: record.age,
                    });
                    formRef.current?.setController({ open: true, idx });
                  }}
                >
                  编辑
                </a>
              );
            },
          },
        ]}
        dataSource={data}
      />
      <ModalForm
        formRef={formRef}
        onFinish={async (e, idx: number) => {
          await someAsyncFunction();
          data[idx] = e;
          setData([...data]);
          console.log(e, 'onFinish');
        }}
        modalProps={{
          title: 'ModalForm',
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
