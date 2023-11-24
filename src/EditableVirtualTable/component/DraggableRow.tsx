import React, { forwardRef } from 'react';

export interface DraggableRowProps {
  children: React.ReactNode;
}

const DraggableRow = (
  { children, ...resetProps }: DraggableRowProps,
  ref: any,
) => {
  return (
    <tr ref={ref} {...resetProps}>
      {children}
    </tr>
  );
};

export default forwardRef(DraggableRow);
