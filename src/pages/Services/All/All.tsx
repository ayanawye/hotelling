import { ServicesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetServicesQuery } from '@entities/services';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const All: FC = () => {
  const { isError, isLoading } = useGetServicesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <ServicesTable />;
};

export default All;
