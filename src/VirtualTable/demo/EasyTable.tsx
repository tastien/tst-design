import { VirtualTable } from '@tastien/tstd';
import React from 'react';
import { ceasyTableColumns, easyTableData } from './const';

function EasyTable() {
  return (
    <VirtualTable
      height={550}
      columns={ceasyTableColumns}
      dataSource={easyTableData}
      pagination={false}
      scroll={{ y: 550, x: '100%' }}
      rowKey="key"
    />
  );
}

export default EasyTable;
