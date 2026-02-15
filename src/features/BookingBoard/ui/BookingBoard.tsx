import 'dayjs/locale/ru';

import type { Booking } from '@entities/booking/api/bookingApi';
import type { Room } from '@entities/booking/model/types';
import { theme, Typography } from 'antd';
import dayjs from 'dayjs';
import type { FC, CSSProperties } from 'react';
import { useMemo } from 'react';

import { getBookingPosition, getTimelineDays } from '../lib/helpers';
import styles from './BookingBoard.module.scss';
import { UsersIcon } from '@shared/assets';

dayjs.locale('ru');

interface BookingBoardProps {
  rooms: Room[];
  bookings: Booking[];
}

const hexToRgba = (hex: string, opacity: number) => {
  let r = 0,
    g = 0,
    b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const BookingBoard: FC<BookingBoardProps> = ({ rooms, bookings }) => {
  const { token } = theme.useToken();
  const timelineDays = useMemo(() => getTimelineDays(), []);

  // Синхронизация токенов Ant Design с CSS-модулем через переменные
  const themeVars = {
    '--primary-color': token.colorPrimary,
    '--border-color': token.colorBorderSecondary,
    '--bg-layout': token.colorBgLayout,
    '--bg-container': token.colorBgContainer,
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
    <div className={styles.board} style={themeVars}>
      {/* Header */}
      <div className={styles.header}>
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
      <div className={styles.body}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`${styles.row} ${styles.cell} ${styles.roomCell}`}
              style={
                {
                  '--status-color':
                    statusColors[room.status.code] || room.status.color,
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

                  // Если нет данных гостя, не отрисовываем
                  if (!booking.guest?.last_name || !booking.guest?.first_name) {
                    return null;
                  }

                  const guestName = `${booking.guest.last_name} ${booking.guest.first_name}`;
                  const guestsCount =
                    (booking.adults ?? 0) +
                    (booking.children ?? 0) +
                    (booking.infants ?? 0);

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
                      className={styles.bookingBar}
                      style={bookingStyles}
                    >
                      <div className={styles.bookingHeader}>
                        <span className={styles.guestName}>{guestName}</span>
                        <div className={styles.guestInfo}>
                          <UsersIcon className={styles.usersIcon} />
                          <span className={styles.guestsCount}>
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
