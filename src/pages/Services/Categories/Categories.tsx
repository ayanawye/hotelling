import type { FC } from 'react';
import { ServiceCategoriesTable } from '@widgets/Tables';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetServiceCategoriesQuery } from '@entities/services';

const Categories: FC = () => {
  const { isError, isLoading } = useGetServiceCategoriesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <ServiceCategoriesTable />;
};

export default Categories;
