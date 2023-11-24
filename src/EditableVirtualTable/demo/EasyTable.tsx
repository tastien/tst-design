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
        record: { key: React.Key },
        _: any,
        action: { startEditable: (arg0: any) => void },
      ) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.key !== record.key));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const request = async () => ({
    data: getData(10),
    total: 10,
    success: true,
  });

  return (
    <EditableVirtualTable
      rowKey="key"
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
    />
  );
};
