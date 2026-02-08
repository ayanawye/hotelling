import { EnclosuresTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetHotelEnclosuresQuery } from '@entities/rooms';

const EnclosuresList: FC = () => {
  const { isError, isLoading } = useGetHotelEnclosuresQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return <EnclosuresTable />;
};

export default EnclosuresList;
