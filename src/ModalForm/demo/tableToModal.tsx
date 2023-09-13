import { ModalForm } from '@tastien/tstd';
import { Form, Input, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { IFormRef } from '..';

type DataType = {
  name: string;
  age: number;
  id: number;
};

const App: React.FC = () => {
  const formRef = useRef<IFormRef<DataType>>(null);
  const [data, setData] = useState<{ name: string; age: number; id: number }[]>(
    [
      { name: '小明', age: 11, id: 1 },
      { name: '小红', age: 12, id: 2 },
      { name: '小军', age: 13, id: 3 },
    ],
  );

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
            render(_, record) {
              return (
                <a
                  onClick={() => {
                    formRef.current?.openModal(record);
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
      <ModalForm<DataType>
        ref={formRef}
        onFinish={async (value) => {
          await someAsyncFunction();
          const index = data.findIndex((i) => i.id === value.id);
          data[index] = value;
          setData([...data]);
          console.log(value, 'onFinish');
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
