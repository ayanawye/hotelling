import { RoomStatusTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetHotelRoomsStatusQuery } from '@entities/rooms';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Status: FC = () => {
  const { isError, isLoading } = useGetHotelRoomsStatusQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки статуса' type='error' />;
  }

  return <RoomStatusTable />;
};

export default Status;
