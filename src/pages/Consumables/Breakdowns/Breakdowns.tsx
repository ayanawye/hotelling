import { type FC } from 'react';
import { useGetConsumableBreakdownsQuery } from '@entities/consumable';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { ConsumableBreakdownsTable } from '@widgets/Tables';

const Breakdowns: FC = () => {
  const { isError, isLoading } = useGetConsumableBreakdownsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <ConsumableBreakdownsTable />;
};

export default Breakdowns;
