import { StaffTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetStaffsQuery } from '@entities/staff';

const All: FC = () => {
  const { isError, isLoading } = useGetStaffsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <StaffTable />;
};

export default All;
