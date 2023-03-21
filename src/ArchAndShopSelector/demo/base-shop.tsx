import { ArchAndShopSelector, ArchNode } from '@tastien/tstd';
import React from 'react';

const App = () => {
  const data: ArchNode[] = [];
  const [shopIds, setShopIds] = React.useState<number[] | undefined>([]);

  return (
    <ArchAndShopSelector
      archList={data}
      controlMode="SHOP"
      value={shopIds}
      onChange={(val) => setShopIds(val)}
    />
  );
};

export default App;
