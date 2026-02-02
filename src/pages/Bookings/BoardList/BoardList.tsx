import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi';
import { BoardingListTable } from '@widgets/Tables';
import { Alert } from 'antd';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';

const BoardList: FC = () => {
  const { isLoading, isError } = useFetchAllBookingsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки бронирований' type='error' />;
  }

  return <BoardingListTable />;
};

export default BoardList;
