import { WashingsTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetAllWashingsQuery } from '@entities/laundry';

const Laundry: FC = () => {
  const { isError, isLoading } = useGetAllWashingsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки стирок' type='error' />;
  }

  return <WashingsTable />;
};

export default Laundry;
