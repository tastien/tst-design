import { VirtualTable } from '@tastien/tstd';
import { Button } from 'antd';
import React from 'react';
import { ceasyTableColumns, getData } from './const';

const App: React.FC = () => {
  const tblRef: Parameters<typeof VirtualTable>[0]['ref'] = React.useRef(null);

  return (
    <>
      <Button
        style={{ marginBottom: 10 }}
        onClick={() => tblRef?.current?.scrollTo({ row: 999 })}
      >
        Scroll To index 999
      </Button>
      <VirtualTable
        ref={tblRef}
        height={550}
        columns={ceasyTableColumns}
        dataSource={getData(1000)}
        pagination={false}
        scroll={{ y: 550, x: '100%' }}
        rowKey="key"
      />
    </>
  );
};

export default App;
