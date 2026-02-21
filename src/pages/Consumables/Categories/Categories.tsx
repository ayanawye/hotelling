import { ConsumableCategoriesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetConsumableCategoriesQuery } from '@entities/consumable';

const Categories: FC = () => {
  const { isError, isLoading } = useGetConsumableCategoriesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <ConsumableCategoriesTable />;
};

export default Categories;
