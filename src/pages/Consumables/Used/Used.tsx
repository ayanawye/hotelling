import { UsedConsumablesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetConsumableUsagesQuery } from '@entities/consumable';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Used: FC = () => {
  const { isError, isLoading } = useGetConsumableUsagesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <UsedConsumablesTable />;
};

export default Used;
