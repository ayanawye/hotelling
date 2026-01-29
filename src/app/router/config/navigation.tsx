import type { UserRole } from './types';
import React from 'react';
import {
  NavCalendarIcon,
  NavConsumablesIcon,
  NavGuestsIcon,
  NavHotelIcon,
  NavLaundressIcon,
  NavOrgIcon,
  NavRoomsIcon,
  NavServicesIcon,
  NavStaffIcon,
  NavTariffIcon,
  NavWalletIcon,
} from '@shared/assets';

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
    icon: <NavCalendarIcon />,
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
    icon: <NavHotelIcon />,
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
    key: 'guests',
    label: 'Гости',
    icon: <NavGuestsIcon />,
    path: '/guests',
  },
  {
    key: 'rooms',
    label: 'Номера',
    icon: <NavRoomsIcon />,
    children: [
      {
        key: 'rooms-enclosures',
        label: 'Корпуса',
        path: '/rooms/enclosures',
      },
      {
        key: 'rooms-floors',
        label: 'Этажи',
        path: '/rooms/floors',
      },
      {
        key: 'rooms-types',
        label: 'Типы номеров',
        path: '/rooms/types',
      },
      {
        key: 'rooms-status',
        label: 'Статус номеров',
        path: '/rooms/status',
      },
      {
        key: 'rooms-stock',
        label: 'Номерной фонд',
        path: '/rooms/stock',
      },
    ],
  },
  {
    key: 'finance',
    label: 'Финансы',
    icon: <NavWalletIcon />,
    children: [
      {
        key: 'finance-taxes',
        label: 'Налоги',
        path: '/finance/taxes',
      },
      {
        key: 'finance-currencies',
        label: 'Валюты',
        path: '/finance/currencies',
      },
      {
        key: 'finance-payment-types',
        label: 'Типы оплаты',
        path: '/finance/payment-types',
      },
      {
        key: 'finance-payments',
        label: 'Платежи',
        path: '/finance/payments',
      },
      {
        key: 'finance-folio',
        label: 'Фолио',
        path: '/finance/folio',
      },
    ],
  },
  {
    key: 'organizations',
    label: 'Организации',
    icon: <NavOrgIcon />,
    children: [
      {
        key: 'organizations-types',
        label: 'Типы организаций',
        path: '/organizations/types',
      },
      {
        key: 'organizations-all',
        label: 'Все',
        path: '/organizations/all',
      },
    ],
  },
  {
    key: 'tariff',
    label: 'Тарифы',
    icon: <NavTariffIcon />,
    children: [
      {
        key: 'tariff-hotel',
        label: 'Отель',
        path: '/tariff/hotel',
      },
      {
        key: 'tariff-organizations',
        label: 'Организации',
        path: '/tariff/organizations',
      },
    ],
  },
  {
    key: 'services',
    label: 'Услуги',
    icon: <NavServicesIcon />,
    children: [
      {
        key: 'services-categories',
        label: 'Категории услуг',
        path: '/services/categories',
      },
      {
        key: 'services-all',
        label: 'Все',
        path: '/services/all',
      },
      {
        key: 'services-orders',
        label: 'Заказы услуг',
        path: '/services/orders',
      },
    ],
  },
  {
    key: 'consumables',
    label: 'Расходники',
    icon: <NavConsumablesIcon />,
    children: [
      {
        key: 'consumables-categories',
        label: 'Категории',
        path: '/consumables/categories',
      },
      {
        key: 'consumables-all',
        label: 'Все',
        path: '/consumables/all',
      },
      {
        key: 'consumables-breakdowns',
        label: 'Поломки',
        path: '/consumables/breakdowns',
      },
      {
        key: 'consumables-used',
        label: 'Использованные',
        path: '/consumables/used',
      },
    ],
  },
  {
    key: 'staff',
    label: 'Персонал',
    icon: <NavStaffIcon />,
    children: [
      {
        key: 'staff-all',
        label: 'Все',
        path: '/staff/all',
      },
      {
        key: 'staff-history',
        label: 'История действий',
        path: '/staff/history',
      },
    ],
  },
  {
    key: 'laundry',
    label: 'Прачка',
    icon: <NavLaundressIcon />,
    children: [
      {
        key: 'laundry-washings',
        label: 'Стирки',
        path: '/laundry/washings',
      },
      {
        key: 'laundry-items',
        label: 'Предметы',
        path: '/laundry/items',
      },
      {
        key: 'laundry-orders',
        label: 'Заказы',
        path: '/laundry/orders',
      },
    ],
  },
  {
    key: 'admin',
    label: 'Администрирование',
    icon: <NavStaffIcon />,
    path: '/admin',
    access: ['MANAGER'],
  },
];
