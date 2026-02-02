import { RoomTypesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetHotelRoomsTypesQuery } from '@entities/rooms';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Types: FC = () => {
  const { isError, isLoading } = useGetHotelRoomsTypesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return <RoomTypesTable />;
};

export default Types;
