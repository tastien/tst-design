import React from 'react';
import { ArchAndShopSelector, ArchNode } from 'tstd';

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
