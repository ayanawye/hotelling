import { Spin } from 'antd';

export const PageLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        minHeight: '200px',
      }}
    >
      <Spin size='large' />
    </div>
  );
};
