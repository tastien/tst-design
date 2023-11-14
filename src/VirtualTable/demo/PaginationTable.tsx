import { VirtualTable } from '@tastien/tstd';
import React from 'react';
import { ceasyTableColumns, easyTableData, pagination } from './const';

const App: React.FC = () => {
  return (
    <VirtualTable
      height={600}
      columns={ceasyTableColumns}
      dataSource={easyTableData}
      scroll={{ y: 600 }}
      pagination={pagination}
      rowKey="key"
    />
  );
};

export default App;
