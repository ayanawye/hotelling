import dayjs, { Dayjs } from 'dayjs';

export const GRID_CONFIG = {
  CELL_WIDTH: 150,
  CELL_HEIGHT: 80,
  SIDEBAR_WIDTH: 110,
  HEADER_HEIGHT: 80,
  DAYS_COUNT: 14,
};

export const getTimelineDays = (
  startDate: Dayjs = dayjs(),
  daysCount: number = GRID_CONFIG.DAYS_COUNT,
): Dayjs[] => {
  return Array.from({ length: daysCount }, (_, i) =>
    startDate.add(i, 'day').startOf('day'),
  );
};

export const getBookingPosition = (
  bookingStart: string | undefined | null,
  bookingEnd: string | undefined | null,
  timelineDays: Dayjs[],
) => {
  if (!bookingStart || !bookingEnd) return null;

  const start = dayjs(bookingStart);
  const end = dayjs(bookingEnd);

  if (!start.isValid() || !end.isValid()) return null;

  const startDay = start.startOf('day');
  const endDay = end.endOf('day');

  const timelineStart = timelineDays[0];
  const timelineEnd = timelineDays[timelineDays.length - 1].add(1, 'day');

  // Если бронирование вне диапазона
  if (endDay.isBefore(timelineStart) || startDay.isAfter(timelineEnd)) {
    return null;
  }

  const effectiveStart = startDay.isBefore(timelineStart)
    ? timelineStart
    : startDay;
  const effectiveEnd = endDay.isAfter(timelineEnd) ? timelineEnd : endDay;

  const leftDays = effectiveStart.diff(timelineStart, 'day');
  const durationDays = Math.ceil(
    effectiveEnd.diff(effectiveStart, 'day', true),
  );

  return {
    left: leftDays * GRID_CONFIG.CELL_WIDTH,
    width: durationDays * GRID_CONFIG.CELL_WIDTH,
  };
};

export const hexToRgba = (hex: string, opacity: number) => {
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
