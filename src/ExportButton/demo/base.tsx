import React from 'react';
import { ExportButton } from 'tstd';

const App: React.FC = () => {
  const request = () => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('导出');
      }, 2000);
    });
  };

  return (
    <ExportButton request={request} animation={false}>
      导出
    </ExportButton>
  );
};

export default App;
