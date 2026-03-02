import { LaundryItemsTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetLaundryItemsQuery } from '@entities/laundry';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Items: FC = () => {
  const { isError, isLoading } = useGetLaundryItemsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }
  return <LaundryItemsTable />;
};

export default Items;
