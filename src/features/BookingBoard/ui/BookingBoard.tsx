import 'dayjs/locale/ru';

import type { Booking } from '@entities/booking/api/bookingApi';
import type { Room } from '@entities/booking/model/types';
import { theme, Typography } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import type { CSSProperties, FC } from 'react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getBookingPosition,
  getTimelineDays,
  hexToRgba,
  GRID_CONFIG,
} from '../lib/helpers';
import { usePullToLoad } from '../lib/usePullToLoad';
import styles from './BookingBoard.module.scss';
import { UsersIcon, RightArrow } from '@shared/assets';
import clsx from 'clsx';

dayjs.locale('ru');

interface BookingBoardProps {
  rooms: Room[];
  bookings: Booking[];
  dates?: [Dayjs | null, Dayjs | null] | null;
  onLoadMore?: (direction: 'forward' | 'backward') => void;
}

export const BookingBoard: FC<BookingBoardProps> = ({
  rooms,
  bookings,
  dates,
  onLoadMore,
}) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const boardRef = useRef<HTMLDivElement>(null);
  const [prevDates, setPrevDates] = useState(dates);

  const {
    pullProgress,
    pullOffset,
    isPulling,
    handleScroll,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePullToLoad({ onLoadMore });

  const timelineDays = useMemo(() => {
    if (dates && dates[0] && dates[1]) {
      const start = dates[0].startOf('day');
      const end = dates[1].startOf('day');
      const diff = end.diff(start, 'day') + 1;
      return getTimelineDays(start, diff > 0 ? diff : 14);
    }
    return getTimelineDays();
  }, [dates]);

  // Корректировка скролла при добавлении дат в начало
  useEffect(() => {
    if (
      boardRef.current &&
      prevDates &&
      dates &&
      prevDates[0] &&
      dates[0] &&
      !dates[0].isSame(prevDates[0], 'day')
    ) {
      const diffDays = prevDates[0].diff(dates[0], 'day');
      if (diffDays > 0) {
        boardRef.current.scrollLeft += diffDays * GRID_CONFIG.CELL_WIDTH;
      }
    }
    setPrevDates(dates);
  }, [dates, prevDates]);

  // Синхронизация токенов Ant Design с CSS-модулем через переменные
  const themeVars = {
    '--primary-color': token.colorPrimary,
    '--border-color': token.colorBorderSecondary,
    '--bg-layout': token.colorBgLayout,
    '--bg-container': token.colorBgContainer,
    '--pull-offset': `${pullOffset}px`,
  } as CSSProperties;

  // Маппинг кодов статусов на цвета Ant Design
  const statusColors: Record<string, string> = {
    available: token.colorSuccess,
    occupied: token.colorError,
    cleaning: token.colorWarning,
    maintenance: token.colorTextTertiary,
  };

  const today = dayjs().startOf('day');

  return (
    <div
      ref={boardRef}
      className={styles.board}
      style={themeVars}
      onScroll={handleScroll}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicators */}
      <div
        className={clsx(styles.pullIndicator, styles.pullStart)}
        style={{ opacity: pullProgress.start }}
      >
        <RightArrow
          style={{
            transform: `rotate(180deg) scale(${0.5 + pullProgress.start * 0.5}) translateX(${-pullOffset}px)`,
          }}
        />
      </div>
      <div
        className={clsx(styles.pullIndicator, styles.pullEnd)}
        style={{ opacity: pullProgress.end }}
      >
        <RightArrow
          style={{
            transform: `scale(${0.5 + pullProgress.end * 0.5}) translateX(${-pullOffset}px)`,
          }}
        />
      </div>

      {/* Header */}
      <div className={clsx(styles.header, isPulling && styles.isPulling)}>
        <div className={styles.corner}>
          <Typography.Text>Номера</Typography.Text>
        </div>
        {timelineDays.map((day) => {
          const isToday = day.isSame(today, 'day');
          return (
            <div
              key={day.toISOString()}
              className={`${styles.cell} ${styles.headerCell} ${isToday ? styles.today : ''}`}
            >
              {isToday && (
                <Typography.Text className={styles.todayLabel}>
                  Сегодня
                </Typography.Text>
              )}
              <Typography.Text className={isToday ? styles.todayDate : ''}>
                {day.format('DD.MM.YYYY')}
              </Typography.Text>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div className={clsx(styles.body, isPulling && styles.isPulling)}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`${styles.row} ${styles.cell} ${styles.roomCell}`}
              style={
                {
                  '--status-color':
                    statusColors[room.room_type.color] || room.room_type.color,
                } as CSSProperties
              }
            >
              <div className={styles.roomContent}>
                <Typography.Text className={styles.roomNumber}>
                  {room.room}
                </Typography.Text>
                <br />
                <Typography.Text type='secondary' className={styles.roomType}>
                  {room.room_type.code}
                </Typography.Text>

                <div className={styles.status}>
                  <span
                    className={styles.squareStatus}
                    style={{ backgroundColor: room.status.color }}
                  />
                  <Typography.Text className={styles.statusText}>
                    {room.status.name}
                  </Typography.Text>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid and Bookings */}
        <div className={styles.gridContainer}>
          {rooms.map((room) => (
            <div key={room.id} className={styles.row}>
              {timelineDays.map((day) => (
                <div key={day.toISOString()} className={styles.cell} />
              ))}

              {/* Render bookings for this room */}
              {bookings
                .filter((b) => b.room === room.id)
                .map((booking) => {
                  const pos = getBookingPosition(
                    booking.arrival_datetime,
                    booking.departure_datetime,
                    timelineDays,
                  );

                  if (!pos) return null;

                  const guest = booking.guest;
                  if (!guest) return null;

                  const guestName =
                    [guest.last_name, guest.first_name, guest.middle_name]
                      .filter(Boolean)
                      .join(' ') || '—';
                  const guestsCount =
                    (booking.adults || 0) +
                    (booking.children || 0) +
                    (booking.infants || 0);

                  const statusColor = room.status.color || token.colorPrimary;
                  const backgroundColor = hexToRgba(statusColor, 0.1);

                  const bookingStyles = {
                    left: pos.left + 5,
                    width: pos.width - 10,
                    backgroundColor,
                    borderColor: statusColor,
                    '--status-color': statusColor,
                  } as CSSProperties;

                  const statusLabels: Record<string, string> = {
                    reserved: 'Забронировано',
                    checked_in: 'Заселен',
                    checked_out: 'Выписан',
                    cancelled: 'Отменен',
                    no_show: 'Неявка',
                  };

                  const bookingStatus =
                    statusLabels[booking.status] || 'Заселен';

                  return (
                    <div
                      key={booking.id}
                      className={clsx(
                        styles[`bookingBar_${booking.status}`],
                        styles.bookingBar,
                      )}
                      style={bookingStyles}
                      onClick={() => navigate(`/bookings/edit/${booking.id}`)}
                    >
                      <div className={styles.bookingHeader}>
                        <span className={styles.guestName}>{guestName}</span>
                        <div className={styles.guestInfo}>
                          <UsersIcon
                            className={styles[`icon_${booking.status}`]}
                          />
                          <span
                            className={clsx(
                              styles.guestsCount,
                              styles[`guestsCount_${booking.status}`],
                            )}
                          >
                            {guestsCount}
                          </span>
                        </div>
                      </div>
                      <div className={styles.bookingStatus}>
                        {bookingStatus}
                      </div>
                      <div className={styles.guestType}>Постоянный гость</div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
