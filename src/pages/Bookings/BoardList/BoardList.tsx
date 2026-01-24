import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi';
import { BoardingListTable } from '@widgets/Tables';
import { Spin } from 'antd';
import type { FC } from 'react';

const BoardList: FC = () => {
  const { isLoading } = useFetchAllBookingsQuery();

  if (isLoading) {
    return <Spin size='large' />;
  }

  // if (isError) {
  //   return <Alert title='Ошибка загрузки бронирований' type='error' />;
  // }

  return (
    <>
      <BoardingListTable />
    </>
  );
};

export default BoardList;
