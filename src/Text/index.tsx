import { Typography } from 'antd';
import classnames from 'classnames';
import * as React from 'react';
import '../global.less';
interface TextProps {
  style?: React.CSSProperties;
  type?: 'primary' | 'grey';
  children: React.ReactNode;
  className?: string;
}

const Text = ({
  children,
  type = 'primary',
  className,
  ...rest
}: TextProps) => {
  const primaryCls = classnames('tst-primary-color', className);

  if (type === 'grey') {
    return (
      <Typography.Text type="secondary" {...rest}>
        {children}
      </Typography.Text>
    );
  }

  return (
    <span className={primaryCls} {...rest}>
      {children}
    </span>
  );
};

export default Text;
