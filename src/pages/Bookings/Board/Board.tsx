import {
  useFetchAllBookingsQuery,
  useFetchRoomStocksQuery,
} from '@entities/booking/api/bookingApi';
import { BookingBoard } from '@features/BookingBoard';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { DatePicker, Skeleton } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { type FC, useState } from 'react';

import styles from './Board.module.scss';

const { RangePicker } = DatePicker;

const Board: FC = () => {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>([
    dayjs().startOf('week'),
    dayjs().startOf('week').add(13, 'day'),
  ]);
  const [search, setSearch] = useState('');

  const loadMore = (direction: 'forward' | 'backward') => {
    setDates((prev) => {
      if (!prev || !prev[0] || !prev[1]) return prev;
      if (direction === 'forward') {
        return [prev[0], prev[1].add(7, 'day')];
      } else {
        return [prev[0].subtract(7, 'day'), prev[1]];
      }
    });
  };

  const { data: bookings, isLoading: isBookingsLoading } =
    useFetchAllBookingsQuery(
      dates?.[0] && dates?.[1]
        ? {
            arrival_from: dates[0].startOf('day').toISOString(),
            arrival_to: dates[1].endOf('day').toISOString(),
          }
        : undefined,
    );
  const { data: rooms, isLoading: isRoomsLoading } = useFetchRoomStocksQuery();

  if (isBookingsLoading || isRoomsLoading) {
    return <Skeleton active />;
  }

  const filteredBookings = bookings?.filter((booking) => {
    if (!search) return true;
    const guest = booking.guest;
    if (!guest) return false;
    const fullName = [guest.last_name, guest.first_name, guest.middle_name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <InputTextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
        <RangePicker
          value={dates}
          onChange={setDates}
          placeholder={['Заезд от', 'Заезд до']}
          format='DD.MM.YYYY'
          allowClear
        />
      </div>
      <BookingBoard
        rooms={rooms || []}
        bookings={filteredBookings || []}
        dates={dates}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default Board;
