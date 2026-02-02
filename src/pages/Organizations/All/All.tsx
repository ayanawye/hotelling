import { OrganizationsTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetOrganizationsQuery } from '@entities/organizations';

const All: FC = () => {
  const { isError, isLoading } = useGetOrganizationsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки организаций' type='error' />;
  }

  return <OrganizationsTable />;
};

export default All;
