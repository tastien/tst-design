import { ArchAndShopSingleSelector, ArchNode } from '@tastien/tstd';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { makeArch, makeShops } from '../mock';

const data: ArchNode[] = [
  makeArch(0, makeShops(10), [
    makeArch(1, makeShops(10, '上海', 10)),
    makeArch(2, makeShops(10, '北京', 20)),
    makeArch(3, makeShops(10, '北京', 30)),
  ]),
];

const App = () => {
  const [form] = useForm();

  return (
    <Form form={form} layout="inline">
      <Form.Item name="archAndShopIds">
        <ArchAndShopSingleSelector archList={data} controlMode="SHOP" />
      </Form.Item>
    </Form>
  );
};

export default App;
