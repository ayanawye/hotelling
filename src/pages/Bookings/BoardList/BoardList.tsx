import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi';
import { BoardingListTable } from '@widgets/Tables';
import { Alert, Spin } from 'antd';
import type { FC } from 'react';

const BoardList: FC = () => {
  const { isLoading, isError } = useFetchAllBookingsQuery();

  if (isLoading) {
    return <Spin size='large' />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки бронирований' type='error' />;
  }

  return <BoardingListTable />;
};

export default BoardList;
