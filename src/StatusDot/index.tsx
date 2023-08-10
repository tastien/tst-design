import * as React from 'react';

interface StatusDotProps {
  type: 'error' | 'warning' | 'success' | 'info' | 'cancel';
  text?: string;
  radius?: number;
  style?: React.CSSProperties;
}

const bgColorMap = {
  error: '#CC3333',
  warning: 'orange',
  success: '#00CC00',
  info: '#0066CC',
  cancel: '#bdbebd',
};

const StatusDot = ({ type, text, radius = 8, style }: StatusDotProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        ...style,
      }}
    >
      <div
        data-testid="status_dot"
        style={{
          backgroundColor: bgColorMap[type],
          borderRadius: '50%',
          width: `${radius}px`,
          height: `${radius}px`,
        }}
      />
      {text && text}
    </div>
  );
};

export default StatusDot;
