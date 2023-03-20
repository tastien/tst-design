import React from 'react';
import {
  ArchAndShopSelector,
  ArchDataProvider,
  createArchDataLoadedWrap,
} from 'tstd';

const Child = createArchDataLoadedWrap(() => {
  return <ArchAndShopSelector controlMode="BOTH" />;
});

const App = () => {
  // 封装的取数逻辑
  const value = { data: [], isLoading: false, refetch: () => {} };
  return (
    <ArchDataProvider value={value}>
      <Child />
    </ArchDataProvider>
  );
};

export default App;
