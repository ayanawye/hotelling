import {
  useFetchAllBookingsQuery,
  useFetchRoomStocksQuery,
} from '@entities/booking/api/bookingApi';
import { BookingBoard } from '@features/BookingBoard';
import { Skeleton } from 'antd';
import type { FC } from 'react';

import styles from './Board.module.scss';

const Board: FC = () => {
  const { data: bookings, isLoading: isBookingsLoading } =
    useFetchAllBookingsQuery();
  const { data: rooms, isLoading: isRoomsLoading } = useFetchRoomStocksQuery();

  if (isBookingsLoading || isRoomsLoading) {
    return <Skeleton active />;
  }

  return (
    <div className={styles.wrapper}>
      <BookingBoard rooms={rooms || []} bookings={bookings || []} />
    </div>
  );
};

export default Board;
