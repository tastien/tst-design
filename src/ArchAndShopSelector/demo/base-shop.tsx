import { ArchAndShopSelector, ArchNode } from '@tastien/tstd';
import React, { useState } from 'react';
import { makeArch, makeShops } from '../mock';

const data: ArchNode[] = [
  makeArch(0, makeShops(10), [
    makeArch(1, makeShops(10, '上海', 10)),
    makeArch(2, makeShops(10, '北京', 20)),
    makeArch(3, makeShops(10, '北京', 30)),
  ]),
];

const App = () => {
  const [shopIds, setShopIds] = useState([]);
  return (
    <ArchAndShopSelector
      archList={data}
      controlMode="SHOP"
      value={shopIds}
      onChange={setShopIds}
    />
  );
};

export default App;
