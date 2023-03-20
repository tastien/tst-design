import React from 'react';
import { ArchAndShopSelector, ArchNode } from 'tstd';

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
