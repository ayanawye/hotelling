import {
  useFetchAllBookingsQuery,
  useFetchRoomStocksQuery,
} from '@entities/booking/api/bookingApi';
import { useGetHotelRoomsTypesQuery } from '@entities/rooms/api/roomsTypeApi';
import { BookingBoard } from '@features/BookingBoard';
import { SearchIcon, FilerIcon2, CloseIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { DatePicker, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { type FC, useState, useRef, useEffect } from 'react';

import styles from './Board.module.scss';

type FilterType =
  | 'all'
  | 'check_in_today'
  | 'check_out_today'
  | 'staying'
  | 'available';

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'check_in_today', label: 'Заезд сегодня' },
  { key: 'check_out_today', label: 'Выезд сегодня' },
  { key: 'staying', label: 'Проживают' },
  { key: 'available', label: 'Свободные' },
];

const Board: FC = () => {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>([
    dayjs().startOf('week'),
    dayjs().startOf('week').add(13, 'day'),
  ]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filter panel state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState<Dayjs | null>(
    dates?.[0] ?? null,
  );
  const [filterEndDate, setFilterEndDate] = useState<Dayjs | null>(
    dates?.[1] ?? null,
  );
  const [filterRoomType, setFilterRoomType] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const handleApplyFilter = () => {
    setDates([filterStartDate, filterEndDate]);
    setFilterOpen(false);
  };

  const handleResetAll = () => {
    const defaultStart = dayjs().startOf('week');
    const defaultEnd = dayjs().startOf('week').add(13, 'day');
    setFilterStartDate(defaultStart);
    setFilterEndDate(defaultEnd);
    setFilterRoomType(null);
    setDates([defaultStart, defaultEnd]);
    setFilterOpen(false);
  };

  const handleResetRoomType = () => {
    setFilterRoomType(null);
  };

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
  const { data: roomTypes } = useGetHotelRoomsTypesQuery();

  if (isBookingsLoading || isRoomsLoading) {
    return <Skeleton active />;
  }

  const today = dayjs().startOf('day');

  const roomTypeOptions =
    roomTypes?.map((rt) => ({
      value: rt.id,
      label: rt.name,
    })) || [];

  // Комнаты, занятые сегодня
  const occupiedRoomIds = new Set(
    bookings
      ?.filter((b) => {
        const arrival = dayjs(b.arrival_datetime).startOf('day');
        const departure = dayjs(b.departure_datetime).startOf('day');
        return (
          (arrival.isSame(today) || arrival.isBefore(today)) &&
          departure.isAfter(today) &&
          b.status === 'checked_in'
        );
      })
      .map((b) => b.room) || [],
  );

  const filteredBookings = bookings?.filter((booking) => {
    if (search) {
      const guest = booking.guest;
      if (!guest) return false;
      const fullName = [guest.last_name, guest.first_name, guest.middle_name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!fullName.includes(search.toLowerCase())) return false;
    }

    const arrival = dayjs(booking.arrival_datetime).startOf('day');
    const departure = dayjs(booking.departure_datetime).startOf('day');

    switch (activeFilter) {
      case 'check_in_today':
        return arrival.isSame(today, 'day');
      case 'check_out_today':
        return departure.isSame(today, 'day');
      case 'staying':
        return (
          (arrival.isSame(today) || arrival.isBefore(today)) &&
          departure.isAfter(today) &&
          booking.status === 'checked_in'
        );
      case 'available':
        return true;
      default:
        return true;
    }
  });

  let filteredRooms = rooms || [];

  if (activeFilter === 'available') {
    filteredRooms = filteredRooms.filter(
      (room) => !occupiedRoomIds.has(room.id),
    );
  }

  if (filterRoomType !== null) {
    filteredRooms = filteredRooms.filter(
      (room) => room.room_type.id === filterRoomType,
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <InputTextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />

        <div className={styles.filterBtnWrapper} ref={filterRef}>
          <button
            className={styles.filterToggleBtn}
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <FilerIcon2 />
            Фильтр
          </button>

          {filterOpen && (
            <div className={styles.filterPanel}>
              <div className={styles.filterPanelHeader}>
                <div className={styles.filterPanelTitle}>
                  <FilerIcon2 />
                  <span>Фильтр</span>
                </div>
                <button
                  className={styles.filterPanelClose}
                  onClick={() => setFilterOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className={styles.filterPanelBody}>
                <div className={styles.filterSection}>
                  <div className={styles.filterSectionLabel}>Дата</div>
                  <div className={styles.filterDatesRow}>
                    <div className={styles.filterDateField}>
                      <label className={styles.filterDateLabel}>Начало</label>
                      <DatePicker
                        value={filterStartDate}
                        onChange={setFilterStartDate}
                        format='DD-MM-YYYY'
                        placeholder='Выберите дату'
                        className={styles.filterDatePicker}
                        allowClear={false}
                      />
                    </div>
                    <div className={styles.filterDateField}>
                      <label className={styles.filterDateLabel}>Конец</label>
                      <DatePicker
                        value={filterEndDate}
                        onChange={setFilterEndDate}
                        format='DD-MM-YYYY'
                        placeholder='Выберите дату'
                        className={styles.filterDatePicker}
                        allowClear={false}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.filterSection}>
                  <div className={styles.filterSectionHeader}>
                    <span className={styles.filterSectionLabel}>
                      Выберите тип номера
                    </span>
                    <button
                      className={styles.filterResetLink}
                      onClick={handleResetRoomType}
                    >
                      Сбросить
                    </button>
                  </div>
                  <Select
                    value={filterRoomType}
                    onChange={setFilterRoomType}
                    placeholder='Тип номера'
                    options={roomTypeOptions}
                    allowClear
                    className={styles.filterRoomTypeSelect}
                    size='large'
                  />
                </div>
              </div>

              <div className={styles.filterPanelFooter}>
                <button
                  className={styles.filterResetBtn}
                  onClick={handleResetAll}
                >
                  Сбросить все
                </button>
                <button
                  className={styles.filterApplyBtn}
                  onClick={handleApplyFilter}
                >
                  Применить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.filters}>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.key}
            className={`${styles.filterBtn} ${activeFilter === option.key ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter(option.key)}
          >
            <span className={styles.filterRadio} />
            {option.label}
          </button>
        ))}
      </div>

      <BookingBoard
        rooms={filteredRooms}
        bookings={filteredBookings || []}
        dates={dates}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default Board;
