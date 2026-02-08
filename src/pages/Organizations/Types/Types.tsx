import { OrganizationTypesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetOrganizationTypesQuery } from '@entities/organizations';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Types: FC = () => {
  const { isError, isLoading } = useGetOrganizationTypesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки организаций' type='error' />;
  }

  return <OrganizationTypesTable />;
};

export default Types;
