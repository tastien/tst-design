import { ArchAndShopSelector, ArchNode } from '@tastien/tstd';
import React from 'react';

const App = () => {
  const data: ArchNode[] = [];

  return (
    <ArchAndShopSelector
      archList={data}
      onChange={(val) => {
        console.log(val);
      }}
    />
  );
};

export default App;
