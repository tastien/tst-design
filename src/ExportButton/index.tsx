import { DownloadOutlined } from '@ant-design/icons';
import { useLoading } from '@shihengtech/hooks';
import { message } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import * as React from 'react';
import DelayButton from './components/DelayButton';
import ExportPageEntery, { addCount } from './components/ExportPageEntery';

interface ExportButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  request: () => Promise<any>;
  onSuccess?: (e: any) => void;
  successMessage?: string;
  animation?: boolean;
}

type CompoundedComponent = ExportButtonProps & {
  ExportPageEntery?: typeof ExportPageEntery;
  addCount?: typeof addCount;
};

const ExportButton = ({
  request,
  onSuccess,
  successMessage = '报表导出成功，可前往我的导出查看。',
  icon = <DownloadOutlined />,
  children,
  ...rest
}: CompoundedComponent) => {
  const { loading, run } = useLoading(
    async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      await request();
      return e;
    },
    {
      onSuccess: (e) => {
        if (onSuccess) onSuccess(e);
        addCount(e);
        message.success(successMessage);
      },
    },
  );

  return (
    <DelayButton
      type="primary"
      loading={loading}
      icon={icon}
      onClick={run}
      {...rest}
    >
      {children}
    </DelayButton>
  );
};

ExportButton.ExportPageEntery = ExportPageEntery;
ExportButton.addCount = addCount;

export default ExportButton;
