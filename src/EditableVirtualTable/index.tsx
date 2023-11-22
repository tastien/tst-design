import { EditableProTable } from '@ant-design/pro-table';
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable';
import { arrayMoveImmutable } from 'array-move';
import _ from 'lodash';
import React, { useMemo } from 'react';

import { virtualList } from '../VirtualTable';
import Draggable, { TMoveItem } from './component/Draggable';
import DragHandle from './component/DragHandle';
import './style.css';

const vid = Math.random().toString();

interface EditableVirtualTableProps extends EditableProTableProps<any, any> {
  /**
   * table 高度
   */
  height: number | string;
  /**
   * 是否可拖动
   * @default false
   */
  draggable?: boolean;
  /**
   *  (可选) 滚动条滚到底部触发api. (scrollbar to the end)
   * @returns null
   */
  reachEnd?: () => void;
  /**
   * (可选) 滚动时触发的api. (triggered by scrolling)
   * @returns null
   */
  onScroll?: () => void;
  /**
   * (可选) 列表渲染时触发的回调函数，参数可以拿到 start: 渲染开始行, renderLen: 渲染行数
   * @param listInfo
   * @returns null
   */
  onListRender?: (listInfo: { start: number; renderLen: number }) => void;
  /**
   * 是否数据变更后重置滚动条 (default true, Whether to reset scrollTop when data changes)
   * @default true
   */
  resetTopWhenDataChange?: boolean;
  vid?: string;
}

const EditableVirtualTable = ({
  height,
  onScroll,
  onListRender,
  reachEnd,
  resetTopWhenDataChange,
  draggable = false,
  ...props
}: EditableVirtualTableProps) => {
  const virtualListComponents = useMemo(
    () =>
      virtualList({
        vid,
        height,
        onScroll,
        onListRender,
        reachEnd,
        resetTopWhenDataChange,
      }),
    [],
  );

  const onSortEnd = ({ oldId, newId }: TMoveItem): void => {
    const { value = [], onChange } = props;
    const { oldIndex, newIndex } = (() => {
      const data: any = value;
      const oldIndex = data.findIndex((item: any) => item.id === oldId);
      const newIndex = data.findIndex((item: any) => item.id === newId);
      return { oldIndex, newIndex };
    })();
    if (oldIndex !== newIndex) {
      const data: any = value;
      const newData = arrayMoveImmutable(
        [].concat(data),
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
      if (onChange) onChange(newData);
    }
  };

  const { DraggableBodyRow, DraggableContainer } = Draggable({
    virtualListComponents: virtualListComponents,
    onSortEnd: onSortEnd,
  });

  const components = draggable
    ? {
        ...virtualListComponents,
        body: {
          ...virtualListComponents?.body,
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }
    : virtualListComponents;

  const defauleColumns = useMemo(() => {
    const columns = _.cloneDeep(props.columns) || [];
    const sortItem = {
      title: 'Sort',
      dataIndex: 'sort',
      width: 50,
      className: 'drag-visible',
      readonly: true,
      render: () => <DragHandle />,
      renderFormItem: () => <DragHandle />,
    };
    if (draggable) {
      return [sortItem, ...columns];
    }
    return columns;
  }, [props.columns]);

  return (
    <EditableProTable
      {...props}
      rowClassName={() => 'editable-row'}
      columns={defauleColumns}
      components={components}
    />
  );
};

export default EditableVirtualTable;
