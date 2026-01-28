import 'dayjs/locale/ru';

import type { Booking } from '@entities/booking/api/bookingApi';
import type { Room } from '@entities/booking/model/types';
import { useTheme } from '@shared/styles/theme/useTheme';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { type FC, useMemo } from 'react';

import {
  getBookingPosition,
  getTimelineDays,
  GRID_CONFIG,
} from '../lib/helpers';

dayjs.locale('ru');

interface BookingBoardProps {
  rooms: Room[];
  bookings: Booking[];
}

export const BookingBoard: FC<BookingBoardProps> = ({ rooms, bookings }) => {
  const { theme } = useTheme();
  const timelineDays = useMemo(() => getTimelineDays(), []);

  const isDark = theme === 'dark';

  const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    backgroundColor: isDark ? '#141414' : '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    marginLeft: GRID_CONFIG.SIDEBAR_WIDTH,
    borderBottom: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: isDark ? '#1f1f1f' : '#fafafa',
  };

  const sidebarStyle: React.CSSProperties = {
    width: GRID_CONFIG.SIDEBAR_WIDTH,
    flexShrink: 0,
    borderRight: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
    position: 'sticky',
    left: 0,
    zIndex: 9,
    backgroundColor: isDark ? '#1f1f1f' : '#fafafa',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    height: GRID_CONFIG.CELL_HEIGHT,
    borderBottom: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
    position: 'relative',
  };

  const cellStyle: React.CSSProperties = {
    width: GRID_CONFIG.CELL_WIDTH,
    flexShrink: 0,
    borderRight: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const bookingBarStyle = (pos: {
    left: number;
    width: number;
  }): React.CSSProperties => ({
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: pos.left + 5,
    width: pos.width - 10,
    backgroundColor: '#1890ff',
    color: '#fff',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    zIndex: 2,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  });

  return (
    <div style={boardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        {timelineDays.map((day) => (
          <div
            key={day.toISOString()}
            style={{
              ...cellStyle,
              height: GRID_CONFIG.HEADER_HEIGHT,
              flexDirection: 'column',
            }}
          >
            <Typography.Text strong>{day.format('DD MMM')}</Typography.Text>
            <Typography.Text type='secondary' size='small'>
              {day.format('dd')}
            </Typography.Text>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          {rooms.map((room) => (
            <div
              key={room.id}
              style={{ ...rowStyle, padding: '0 16px', alignItems: 'center' }}
            >
              <div>
                <Typography.Text strong>№ {room.number}</Typography.Text>
                <br />
                <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
                  {room.type}
                </Typography.Text>
              </div>
            </div>
          ))}
        </div>

        {/* Grid and Bookings */}
        <div style={{ position: 'relative' }}>
          {rooms.map((room) => (
            <div key={room.id} style={rowStyle}>
              {timelineDays.map((day) => (
                <div key={day.toISOString()} style={cellStyle} />
              ))}

              {/* Render bookings for this room */}
              {bookings
                .filter((b) => b.room === Number(room.id))
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
                    <div key={booking.id} style={bookingBarStyle(pos)}>
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
