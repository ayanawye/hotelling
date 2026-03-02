import { ConsumablesTable } from '@widgets/Tables';
import { type FC } from 'react';
import { useGetConsumablesQuery } from '@entities/consumable';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const All: FC = () => {
  const { isError, isLoading } = useGetConsumablesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <ConsumablesTable />;
};

export default All;
