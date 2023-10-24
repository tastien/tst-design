import { VirtualTable } from '@tastien/tstd';
import React from 'react';

const generateData = () => {
  const temp = [];

  for (let i = 0; i < 2; i += 1) {
    temp.push({
      orgName: `组织${i}`,
      num: 600,
      children: [
        {
          orgName: `组织${i}_${i}`,
          num: 600,
          children: [
            {
              orgName: `组织${i}_${i}_1`,
              num: 100,
            },
            {
              orgName: `组织${i}_${i}_2`,
              num: 100,
            },

            {
              orgName: `组织${i}_${i}_3`,
              num: 100,
            },
            {
              orgName: `组织${i}_${i}_4`,
              num: 100,
            },
            {
              orgName: `组织${i}_${i}_5`,
              num: 100,
            },
            {
              orgName: `组织${i}_${i}_6`,
              num: 100,
            },
          ],
        },
      ],
    });
  }

  return temp;
};

const data = generateData();

function TreeTable() {
  const columns = [
    {
      title: '组织名称',
      dataIndex: 'orgName',
      key: 'orgName',
      width: 150,
    },
    {
      title: '组织人数',
      dataIndex: 'num',
      key: 'num',
      width: 200,
    },
  ];

  return (
    <div>
      <h2>sub table</h2>
      <VirtualTable
        height={500}
        resetTopWhenDataChange={false}
        columns={columns}
        dataSource={data}
        rowKey="orgName"
        pagination={false}
        scroll={{ y: 500, x: '100%' }}
      />
    </div>
  );
}

export default TreeTable;
