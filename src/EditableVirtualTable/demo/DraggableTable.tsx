import { EditableVirtualTable } from '@tastien/tstd';
import React, { useState } from 'react';
import { columns, DataSourceType, getData, waitTime } from './const';

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const defauleColumns = [
    ...columns,
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (
        _text: any,
        record: { id: React.Key },
        _: any,
        action: { startEditable: (arg0: any) => void },
      ) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const request = async () => ({
    data: getData(9999),
    total: 9999,
    success: true,
  });

  return (
    <EditableVirtualTable
      rowKey="id"
      height={550}
      scroll={{ y: 550, x: '100%' }}
      loading={false}
      columns={defauleColumns}
      recordCreatorProps={false}
      request={request}
      value={dataSource}
      onChange={setDataSource}
      resetTopWhenDataChange={false}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          await waitTime(2000);
        },
        onChange: setEditableRowKeys,
      }}
      draggable={true}
      reachEnd={() => {
        console.log('reachEnd');
      }}
    />
  );
};
