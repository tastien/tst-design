import * as React from 'react';
const Title = ({ subTitle }: { subTitle?: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <span
      style={{
        marginTop: '10px',
      }}
    >
      选择时间
    </span>
    {subTitle && (
      <span
        style={{
          color: '#686868',
          fontSize: '14px',
        }}
      >
        {subTitle}
      </span>
    )}
  </div>
);

export default Title;
