import { FloorsTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetHotelFloorsQuery } from '@entities/rooms';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Floors: FC = () => {
  const { isError, isLoading } = useGetHotelFloorsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return <FloorsTable />;
};

export default Floors;
