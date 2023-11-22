import { VCellProps } from '@tastien/tstd/VirtualTable/components/VCell';
import { VRowProps } from '@tastien/tstd/VirtualTable/components/VRow';
import { VWrapperProps } from '@tastien/tstd/VirtualTable/components/VWrapper';
import React, { forwardRef, useMemo, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemTypes } from '../const';

export type TMoveItem = { oldId: number; newId: number };
type TSortableItem = {
  id: number;
  children: React.ReactElement[];
  style: React.CSSProperties;
};

interface IProps {
  virtualListComponents: {
    table: (p: any) => JSX.Element;
    body: {
      wrapper: React.FC<VWrapperProps>;
      row: React.FC<VRowProps>;
      cell: React.FC<VCellProps>;
    };
  };
  onSortEnd: (e: TMoveItem) => void;
}

let moveItem: TMoveItem;
const Draggable = ({ virtualListComponents, onSortEnd }: IProps) => {
  const VRow = forwardRef(virtualListComponents.body.row as any) as any;
  const VWrapper = virtualListComponents.body.wrapper;

  const DraggableContainer = (props: VWrapperProps) => (
    <DndProvider backend={HTML5Backend}>
      <VWrapper {...props} />
    </DndProvider>
  );

  const SortableItem = (props: TSortableItem) => {
    const dragRef = useRef(null);
    const previewRef = useRef(null);
    const { id } = props;
    const [{ handlerId }, connectDrag, preview] = useDrag(
      {
        type: ItemTypes.CARD,
        item: { id: id },
        end: () => {
          if (onSortEnd) onSortEnd(moveItem);
        },
        collect: (monitor) => {
          const result = {
            handlerId: monitor.getHandlerId(),
          };
          return result;
        },
      },
      [],
    );
    const [{ isOver }, connectDrop] = useDrop(
      {
        accept: ItemTypes.CARD,
        hover({ id: draggedId }: { id: number }) {
          if (draggedId !== id) {
            moveItem = { oldId: draggedId, newId: id };
          }
        },
        collect: (monitor) => {
          const result = {
            isOver: monitor.isOver(),
          };
          return result;
        },
      },
      [],
    );

    const dragHandle = useMemo(() => {
      if (!props.children?.length) {
        return null;
      }
      const Dom = props.children?.find((item) => item?.key === 'sort');
      return (
        <td key={Dom?.key} ref={dragRef} data-handler-id={handlerId}>
          <table>
            <tbody>
              <tr>{Dom}</tr>
            </tbody>
          </table>
        </td>
      );
    }, [props]);

    if (dragHandle) {
      props.children.splice(0, 1, dragHandle);
    }

    connectDrag(dragRef);
    connectDrop(previewRef);
    preview(previewRef);

    return (
      <VRow
        ref={previewRef}
        {...props}
        style={{
          backgroundColor: isOver ? '#eee' : undefined,
          ...props.style,
        }}
      />
    );
  };

  const DraggableBodyRow = ({
    ...restProps
  }: {
    children: TSortableItem['children'];
    style: TSortableItem['style'];
    'data-row-key': number;
  }) => {
    return (
      <SortableItem
        key={restProps['data-row-key']}
        id={restProps['data-row-key']}
        {...restProps}
      />
    );
  };

  return { DraggableBodyRow, DraggableContainer };
};

export default Draggable;
