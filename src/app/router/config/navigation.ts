import type { UserRole } from './types';

export interface NavItem {
  key: string;
  label: string;
  path?: string;
  access?: UserRole[];
  icon?: React.ReactNode;
  children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  {
    key: '/',
    label: 'Бронирование',
    children: [
      {
        key: 'bookings-board',
        label: 'Доска',
        path: '/bookings/board',
      },
      {
        key: 'bookings-list',
        label: 'Список',
        path: '/bookings/list',
      },
    ],
  },
  {
    key: 'hotel',
    label: 'Отель',
    children: [
      {
        key: 'hotel-rooms',
        label: 'Номера',
        path: '/hotel/rooms',
      },
      {
        key: 'hotel-staff',
        label: 'Персонал',
        path: '/hotel/staff',
        access: ['MANAGER'],
      },
    ],
  },
  {
    key: 'admin',
    label: 'Администрирование',
    path: '/admin',
    access: ['MANAGER'],
  },
];
