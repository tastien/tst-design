import classnames from 'classnames';
import * as React from 'react';
import './style.less';
interface TextProps {
  style?: React.CSSProperties;
  type?: 'primary' | 'grey';
  children: React.ReactNode;
  className?: string;
  ellipsisWidth?: number | string;
  bold?: boolean;
}

const Text = ({
  children,
  type = 'primary',
  className,
  ellipsisWidth,
  bold,
  style,
  ...rest
}: TextProps) => {
  const cls = classnames(
    {
      'tst-primary-color': type === 'primary' || !type,
      'tst-text-grey': type === 'grey',
      'tst-text-ellipsis': ellipsisWidth,
      'tst-text-bold': bold,
    },
    className,
  );

  return (
    <span
      title={ellipsisWidth && children}
      className={cls}
      style={{
        ...style,
        width: ellipsisWidth,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Text;
