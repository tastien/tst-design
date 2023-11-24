import { EditableProTable } from '@ant-design/pro-table';
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable';
import { arrayMoveImmutable } from 'array-move';
import _ from 'lodash';
import React, { useMemo } from 'react';

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { SortEnd } from 'react-sortable-hoc';
import { virtualList } from '../VirtualTable';
import Draggable from './component/Draggable';
import DraggableRow from './component/DraggableRow';
import './style.css';

const vid = Math.random().toString();

type TVirtual =
  | {
      /**
       * 虚拟列表
       * @default false
       */
      virtual?: false | undefined;
    }
  | {
      virtual?: true;
      scroll: {
        x?: string | number | true | undefined;
        y: string | number;
      };
    };

type TEditableVirtualTable = EditableProTableProps<any, any> & {
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
} & TVirtual;

const EditableVirtualTable = ({
  onScroll,
  onListRender,
  reachEnd,
  resetTopWhenDataChange,
  draggable = false,
  virtual = false,
  ...props
}: TEditableVirtualTable) => {
  const virtualListComponents = useMemo(
    () =>
      virtualList({
        vid,
        height: props.scroll?.y || '100%',
        onScroll,
        onListRender,
        reachEnd,
        resetTopWhenDataChange,
      }),
    [],
  );
  const VRow = virtualListComponents.body.row;
  const VWrapper = virtualListComponents.body.wrapper;

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
    const { value = [], onChange } = props;
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        value.slice(),
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      if (onChange) onChange(newData);
    }
    // const { oldIndex, newIndex } = (() => {
    //   const data: any = value;
    //   const oldIndex = data.findIndex((item: any) => item.id === oldId);
    //   const newIndex = data.findIndex((item: any) => item.id === newId);
    //   return { oldIndex, newIndex };
    // })();
    // if (oldIndex !== newIndex) {
    //   const data: any = value;
    //   const newData = arrayMoveImmutable(
    //     [].concat(data),
    //     oldIndex,
    //     newIndex,
    //   ).filter((el) => !!el);
    //   if (onChange) onChange(newData);
    // }
  };

  const { DraggableBodyRow, DraggableContainer } = Draggable({
    Row: virtual ? VRow : DraggableRow,
    Wrapper: virtual ? VWrapper : undefined,
    dataSource: props.value,
    onSortEnd: onSortEnd,
  });

  const components = () => {
    if (virtual) {
      if (draggable) {
        return {
          ...virtualListComponents,
          body: {
            ...virtualListComponents?.body,
            row: DraggableBodyRow,
            wrapper: DraggableContainer,
          },
        };
      }
      return virtualListComponents;
    } else {
      if (draggable) {
        return {
          body: {
            row: DraggableBodyRow,
            wrapper: DraggableContainer,
          },
        };
      }
      return undefined;
    }
  };

  const defauleColumns = useMemo(() => {
    const columns = _.cloneDeep(props.columns) || [];
    const sortItem = {
      dataIndex: 'sort',
    };
    if (draggable) {
      return [sortItem, ...columns];
    }
    return columns;
  }, [props.columns]);

  return (
    // <DndProvider backend={HTML5Backend}>
    <EditableProTable
      {...props}
      rowClassName={() => 'editable-row'}
      columns={defauleColumns}
      components={components()}
    />
    // </DndProvider>
  );
};

export default EditableVirtualTable;
