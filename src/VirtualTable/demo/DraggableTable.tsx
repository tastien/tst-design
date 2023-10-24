import { SwapOutlined } from '@ant-design/icons';
import { VirtualTable } from '@tastien/tstd';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { arrayMoveImmutable } from 'array-move';
import React, { useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import './index.less';

const { virtualList } = VirtualTable;

const generateData = () => {
  const tempDataSource = [];
  for (let i = 0; i < 100; i += 1) {
    tempDataSource.push({
      id: i + 1,
      name: `福建一公司${i}`,
      num: `${i * 100}`,
      address: `中国福建福州`,
    });
  }
  return tempDataSource;
};

const dataSource = generateData();

const vlistComponents = virtualList({
  height: 500,
  resetTopWhenDataChange: false,
});
const VRow = vlistComponents.body.row;
const VWrapper = vlistComponents.body.wrapper;

const DragHandle = SortableHandle(() => (
  <a>
    <SwapOutlined
      style={{
        transform: 'rotate(90deg)',
      }}
    />
  </a>
));

const SortableItem = SortableElement((props: any) => <VRow {...props} />);
const SortableBody = SortableContainer((props: any) => <VWrapper {...props} />);

type DataType = {
  id: number;
  name: string;
  num: string;
  address: string;
};

export default () => {
  const [data, setDataSource] = useState<DataType[]>(dataSource);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex) {
      // @ts-ignore
      const newData = arrayMoveImmutable(
        [].concat(data),
        oldIndex,
        newIndex,
      ).filter((el: any) => !!el);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ ...restProps }: any) => {
    const index = data.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '操作',
      width: 200,
      dataIndex: 'sort',
      className: 'drag-visible',
      render: () => {
        return (
          <Space>
            <DragHandle />
          </Space>
        );
      },
    },
    {
      title: '公司名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '人数',
      dataIndex: 'num',
      width: 200,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 200,
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      pagination={false}
      columns={columns}
      scroll={{ y: 500 }}
      components={{
        ...vlistComponents,
        body: {
          ...vlistComponents?.body,
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};
