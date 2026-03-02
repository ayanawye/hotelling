import { LaundryOrdersTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetLaundryOrdersQuery } from '@entities/laundry';

const Orders: FC = () => {
  const { isError, isLoading } = useGetLaundryOrdersQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки ' type='error' />;
  }

  return <LaundryOrdersTable />;
};

export default Orders;
