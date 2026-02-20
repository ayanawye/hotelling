import type { FC } from 'react';
import { useGetHotelEnclosuresQuery } from '@entities/rooms';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { EnclosuresTable } from '@widgets/Tables';

const Enclosures: FC = () => {
  const { isError, isLoading } = useGetHotelEnclosuresQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return <EnclosuresTable />;
};

export default Enclosures;
