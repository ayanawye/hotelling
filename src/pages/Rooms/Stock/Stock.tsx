import { RoomStockTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetHotelRoomStocksQuery } from '@entities/rooms';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Stock: FC = () => {
  const { isError, isLoading } = useGetHotelRoomStocksQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки фондов' type='error' />;
  }

  return <RoomStockTable />;
};

export default Stock;
