import { DownloadOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import * as React from 'react';
import eventEmitter from '../../utils/eventEmitter';
import { showExportAnimation } from '../../utils/utils';

export const addCount = (e: any) => {
  showExportAnimation({ x: e.clientX, y: e.clientY });
  setTimeout(() => {
    eventEmitter.emit('change-report-num');
  }, 400);
};

type ExportPageEnteryProps = {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  badgeSize?: 'default' | 'small';
};

const ExportPageEntery = ({
  onClick,
  className,
  style,
  iconStyle,
  badgeSize,
}: ExportPageEnteryProps) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const handler = () => {
      setCount((n) => n + 1);
    };
    eventEmitter.on('change-report-num', handler);
    return () => {
      eventEmitter.off('change-report-num', handler);
    };
  }, []);

  return (
    <span
      className={className}
      style={style}
      onClick={() => {
        if (onClick) onClick();
        setCount(0);
      }}
    >
      <Badge count={count} size={badgeSize}>
        <DownloadOutlined id="export-entery-icon" style={iconStyle} />
      </Badge>
    </span>
  );
};

export default ExportPageEntery;
