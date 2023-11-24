import { SwapOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { useEffect, useImperativeHandle, useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import { virtualList as VList } from '../../VirtualTable';

import React from 'react';
import { columns, getData } from './const';

const vlistComponents = VList({ height: 500, resetTopWhenDataChange: false });
const VRow = vlistComponents.body.row;
const VWrapper = vlistComponents.body.wrapper;

type TProps = {
  loading: boolean;
  dataSource: any;
  isSort: boolean;
  rowSelection: any;
  onChange: (values: any[]) => void;
  cRef: any;
  operateDOM: (record: any) => JSX.Element;
  typeText: string;
};

const DragHandle = SortableHandle(() => (
  <a>
    <SwapOutlined
      style={{
        transform: 'rotate(90deg)',
      }}
    />
    按住拖拽
  </a>
));
// const SortableItem = SortableElement((props: any) => <tr style={{ zIndex: 1100 }} {...props} />);
// const SortableBody = SortableContainer((props: any) => <tbody {...props} />);

const SortableItem = SortableElement((props: any) => <VRow {...props} />);
const SortableBody = SortableContainer((props: any) => <VWrapper {...props} />);

export default ({
  loading,
  dataSource,
  isSort = true,
  onChange,
  cRef,
  rowSelection,
}: TProps) => {
  const [_dataSource, setDataSource] = useState<any[]>([]);
  console.log(
    '%c [ _dataSource ]-59',
    'font-size:13px; background:pink; color:#bf2c9f;',
    _dataSource,
  );

  useEffect(() => setDataSource(getData(100)), [dataSource]);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex) {
      // @ts-ignore
      const newData = arrayMoveImmutable(
        [].concat(_dataSource as any),
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
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
    const index = _dataSource.findIndex(
      (x) => x.key === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  useImperativeHandle(cRef, () => ({
    onChange: () => onChange(_dataSource),
    reset: () => {
      setDataSource(dataSource);
    },
  }));

  const tableProps = isSort
    ? {
        components: {
          ...vlistComponents,
          body: {
            ...vlistComponents?.body,
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        },
      }
    : {
        columns,
        scroll: { x: 600 },
      };

  return (
    <Table
      loading={loading}
      rowKey="key"
      dataSource={_dataSource}
      pagination={false}
      rowSelection={rowSelection}
      columns={[
        { title: 'sort', dataIndex: 'sort', render: () => <DragHandle /> },
        ...columns,
      ]}
      scroll={{ y: 500 }}
      {...tableProps}
    />
  );
};
