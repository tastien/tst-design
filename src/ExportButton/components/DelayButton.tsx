import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import React, { ReactNode, useState } from 'react';
import useUpdateEffect from '../hooks/useUpdateEffect';

export interface DelayButtonProps extends ButtonProps {
  delay?: number; // 单位 s, 一定要大于 1
  delayRender?(lastTime: number): ReactNode;
}

const DelayButton = ({
  children,
  loading,
  delayRender,
  delay = 3,
  ...props
}: DelayButtonProps) => {
  const [disabledTime, setDisabledTime] = useState(0);

  let context;
  if (!!disabledTime) {
    if (!delayRender) {
      context = `${disabledTime}s 后可继续导出`;
    } else {
      context = delayRender(disabledTime);
    }
  } else {
    context = children;
  }

  useUpdateEffect(() => {
    if (loading || delay < 1) return;

    (async () => {
      for (let i = delay + 1; i--; ) {
        setDisabledTime(i);
      }
    })();
  }, [loading]);

  return (
    <Button {...props} loading={loading} disabled={!!disabledTime}>
      {context}
    </Button>
  );
};

export default DelayButton;
