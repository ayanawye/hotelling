import dayjs, { Dayjs } from 'dayjs';

export const GRID_CONFIG = {
  CELL_WIDTH: 150,
  CELL_HEIGHT: 80,
  SIDEBAR_WIDTH: 110,
  HEADER_HEIGHT: 80,
  DAYS_COUNT: 14,
};

export const getTimelineDays = (startDate: Dayjs = dayjs()): Dayjs[] => {
  return Array.from({ length: GRID_CONFIG.DAYS_COUNT }, (_, i) =>
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
