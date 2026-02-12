import 'dayjs/locale/ru';

import type { Booking } from '@entities/booking/api/bookingApi';
import type { Room } from '@entities/booking/model/types';
import { theme, Typography } from 'antd';
import dayjs from 'dayjs';
import { type FC, useMemo } from 'react';

import { getBookingPosition, getTimelineDays } from '../lib/helpers';
import styles from './BookingBoard.module.scss';

dayjs.locale('ru');

interface BookingBoardProps {
  rooms: Room[];
  bookings: Booking[];
}

export const BookingBoard: FC<BookingBoardProps> = ({ rooms, bookings }) => {
  const { token } = theme.useToken();
  const timelineDays = useMemo(() => getTimelineDays(), []);

  // Синхронизация токенов Ant Design с CSS-модулем через переменные
  const themeVars = {
    '--primary-color': token.colorPrimary,
    '--border-color': token.colorBorderSecondary,
    '--bg-layout': token.colorBgLayout,
    '--bg-container': token.colorBgContainer,
  } as React.CSSProperties;

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
                } as React.CSSProperties
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

                  const guestName = `${booking.guest.last_name} ${booking.guest.first_name[0]}.`;
                  return (
                    <div
                      key={booking.id}
                      className={styles.bookingBar}
                      style={{
                        left: pos.left + 5,
                        width: pos.width - 10,
                        backgroundColor: room.status.color,
                        borderColor: room.status.color,
                      }}
                    >
                      {guestName}
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
