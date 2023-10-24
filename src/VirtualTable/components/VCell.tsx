import React from 'react';

export interface VCellProps {
  children: React.ReactNode;
}

const VCell: React.FC<VCellProps> = ({ children, ...restProps }) => {
  return (
    <td {...restProps}>
      <div>{children}</div>
    </td>
  );
};

export default VCell;
