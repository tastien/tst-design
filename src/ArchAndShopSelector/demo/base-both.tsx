import { ArchAndShopSelector, ArchAndShopValue, ArchNode } from '@tastien/tstd';
import React from 'react';

const App = () => {
  const data: ArchNode[] = [];
  const [archAndShop, setArchAndShop] = React.useState<ArchAndShopValue>([
    [],
    [],
  ]);

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
