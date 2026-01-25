import { useStyles } from '@shared/styles';
import { Spin } from 'antd';

export const PageLoader = () => {
  const { pageLoaderStyle } = useStyles();

  return (
    <div style={pageLoaderStyle}>
      <Spin size='large' />
    </div>
  );
};
