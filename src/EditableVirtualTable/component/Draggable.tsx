import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';

type TSortableItem = {
  id: number;
  children: React.ReactElement[];
  style: React.CSSProperties;
};

interface IProps {
  Row: React.FC<any>;
  Wrapper?: React.FC<any>;
  dataSource?: any;
  onSortEnd: SortEndHandler;
}
const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const Draggable = ({ Row, Wrapper, dataSource, onSortEnd }: IProps) => {
  const SortableItem = SortableElement(
    ({ children, ...props }: TSortableItem) => {
      return (
        <Row {...props}>
          {React.Children.map(children, (child) => {
            if ((child as React.ReactElement).key === 'sort') {
              return React.cloneElement(child as React.ReactElement, {
                children: <DragHandle />,
              });
            }
            return child;
          })}
        </Row>
      );
    },
  );

  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) =>
      Wrapper ? <Wrapper {...props} /> : <tbody {...props} />,
  );

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({ ...restProps }) => {
    const index = dataSource.findIndex(
      (x: { key: any }) => x.key === restProps['data-row-key'],
    );
    console.log(
      '%c [ index ]-66',
      'font-size:13px; background:pink; color:#bf2c9f;',
      index,
    );
    console.log(
      '%c [ restProps["data-row-key"] ]-67',
      'font-size:13px; background:pink; color:#bf2c9f;',
      restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  return { DraggableBodyRow, DraggableContainer };
};

export default Draggable;
