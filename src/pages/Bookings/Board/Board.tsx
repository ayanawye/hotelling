import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi';
import type { Room } from '@entities/booking/model/types';
import { BookingBoard } from '@features/BookingBoard';
import { Skeleton } from 'antd';
import type { FC } from 'react';

const MOCK_ROOMS: Room[] = [
  { id: '1', number: '101', type: 'Standard', status: 'available' },
  { id: '2', number: '102', type: 'Standard', status: 'occupied' },
  { id: '3', number: '103', type: 'Deluxe', status: 'available' },
  { id: '4', number: '201', type: 'Suite', status: 'cleaning' },
  { id: '5', number: '202', type: 'Suite', status: 'available' },
];

const Board: FC = () => {
  const { data: bookings, isLoading } = useFetchAllBookingsQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <BookingBoard rooms={MOCK_ROOMS} bookings={bookings || []} />
    </div>
  );
};

export default Board;
