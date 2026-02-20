import { ServiceOrdersTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetServiceOrdersQuery } from '@entities/services';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Orders: FC = () => {
  const { isError, isLoading } = useGetServiceOrdersQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <ServiceOrdersTable />;
};

export default Orders;
