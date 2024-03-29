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
  const [archAndShop, setArchAndShop] = useState([[], []]);
  return (
    <ArchAndShopSelector
      archList={data}
      controlMode="BOTH"
      value={archAndShop}
      onChange={setArchAndShop}
    />
  );
};

export default App;
