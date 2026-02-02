import { Spin } from 'antd';
import './PageLoader.scss';

export const PageLoader = () => {
  return (
    <div className='loader_center'>
      <Spin size='large' />
    </div>
  );
};
