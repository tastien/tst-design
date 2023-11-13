import { Space, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const ceasyTableColumns: ColumnsType<DataType> = [
  {
    title: 'key',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export const easyTableData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const pagination = {
  defaultPageSize: 50,
  defaultCurrent: 1,
  showQuickJumper: true,
  showTotal(total: any): any {
    return `总共${total}条数据`;
  },
  showSizeChanger: true,
  pageSizeOptions: ['10', '50', '100'],
};

export const getData = (count: number) => {
  const data = new Array(count).fill(null).map((_, index) => ({
    key: index,
    name: `First_${index.toString(16)}， Last__${index.toString(16)}`,
    lastName: ``,
    age: 25 + (index % 10),
    address: `New York No. ${index} Lake Park`,
    tags: ['nice', 'good'],
  }));

  return data;
};
