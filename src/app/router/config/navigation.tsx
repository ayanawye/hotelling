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
  menu?: boolean;
  access?: UserRole[];
  icon?: React.ReactNode;
  children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  {
    key: '/bookings',
    label: 'Бронирование',
    icon: <NavCalendarIcon />,
    menu: true,
    children: [
      {
        key: 'bookings-board',
        label: 'Доска',
        path: '/bookings/board',
        menu: true,
      },
      {
        key: 'bookings-list',
        label: 'Список',
        path: '/bookings/list',
        menu: true,
        children: [
          {
            key: 'bookings-create',
            label: 'Создание бронирования',
            path: '/bookings/create',
            menu: false,
          },
          {
            key: 'bookings-edit',
            label: 'Изменение бронирования',
            path: '/bookings/edit/:id',
            menu: false,
          },
        ],
      },
    ],
  },
  {
    key: 'hotel',
    label: 'Отель',
    icon: <NavHotelIcon />,
    menu: true,
    children: [
      {
        key: 'hotel-rooms',
        label: 'Общие настройки',
        path: '/hotel/settings',
        menu: true,
      },
    ],
  },
  {
    key: 'guests',
    label: 'Гости',
    icon: <NavGuestsIcon />,
    path: '/guests',
    menu: true,
  },
  {
    key: 'rooms',
    label: 'Номера',
    icon: <NavRoomsIcon />,
    menu: true,
    children: [
      {
        key: 'rooms-enclosures',
        label: 'Корпуса',
        path: '/rooms/enclosures',
        menu: true,
        children: [
          {
            key: 'rooms-enclosures/create',
            label: 'Создать корпус',
            path: '/rooms/enclosures/create',
            menu: false,
          },
          {
            key: 'rooms-enclosures/edit',
            label: 'Изменить корпус',
            path: '/rooms/enclosures/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'rooms-floors',
        label: 'Этажи',
        path: '/rooms/floors',
        menu: true,
      },
      {
        key: 'rooms-types',
        label: 'Типы номеров',
        path: '/rooms/types',
        menu: true,
      },
      {
        key: 'rooms-status',
        label: 'Статус номеров',
        path: '/rooms/status',
        menu: true,
      },
      {
        key: 'rooms-stock',
        label: 'Номерной фонд',
        path: '/rooms/stock',
        menu: true,
      },
    ],
  },
  {
    key: 'finance',
    label: 'Финансы',
    icon: <NavWalletIcon />,
    menu: true,
    children: [
      {
        key: 'finance-taxes',
        label: 'Налоги',
        path: '/finance/taxes',
        menu: true,
      },
      {
        key: 'finance-currencies',
        label: 'Валюты',
        path: '/finance/currencies',
        menu: true,
      },
      {
        key: 'finance-payment-types',
        label: 'Типы оплаты',
        path: '/finance/payment-types',
        menu: true,
      },
      {
        key: 'finance-payments',
        label: 'Платежи',
        path: '/finance/payments',
        menu: true,
      },
      {
        key: 'finance-folio',
        label: 'Фолио',
        path: '/finance/folio',
        menu: true,
      },
    ],
  },
  {
    key: 'organizations',
    label: 'Организации',
    icon: <NavOrgIcon />,
    menu: true,
    children: [
      {
        key: 'organizations-types',
        label: 'Типы организаций',
        path: '/organizations/types',
        menu: true,
      },
      {
        key: 'organizations-all',
        label: 'Все',
        path: '/organizations/all',
        menu: true,
      },
    ],
  },
  {
    key: 'tariff',
    label: 'Тарифы',
    icon: <NavTariffIcon />,
    menu: true,
    children: [
      {
        key: 'tariff-hotel',
        label: 'Отель',
        path: '/tariff/hotel',
        menu: true,
      },
      {
        key: 'tariff-organizations',
        label: 'Организации',
        path: '/tariff/organizations',
        menu: true,
      },
    ],
  },
  {
    key: 'services',
    label: 'Услуги',
    icon: <NavServicesIcon />,
    menu: true,
    children: [
      {
        key: 'services-categories',
        label: 'Категории услуг',
        path: '/services/categories',
        menu: true,
      },
      {
        key: 'services-all',
        label: 'Все',
        path: '/services/all',
        menu: true,
      },
      {
        key: 'services-orders',
        label: 'Заказы услуг',
        path: '/services/orders',
        menu: true,
      },
    ],
  },
  {
    key: 'consumables',
    label: 'Расходники',
    icon: <NavConsumablesIcon />,
    menu: true,
    children: [
      {
        key: 'consumables-categories',
        label: 'Категории',
        path: '/consumables/categories',
        menu: true,
      },
      {
        key: 'consumables-all',
        label: 'Все',
        path: '/consumables/all',
        menu: true,
      },
      {
        key: 'consumables-breakdowns',
        label: 'Поломки',
        path: '/consumables/breakdowns',
        menu: true,
      },
      {
        key: 'consumables-used',
        label: 'Использованные',
        path: '/consumables/used',
        menu: true,
      },
    ],
  },
  {
    key: 'staff',
    label: 'Персонал',
    icon: <NavStaffIcon />,
    menu: true,
    children: [
      {
        key: 'staff-all',
        label: 'Все',
        path: '/staff/all',
        menu: true,
      },
      {
        key: 'staff-history',
        label: 'История действий',
        path: '/staff/history',
        menu: true,
      },
    ],
  },
  {
    key: 'laundry',
    label: 'Прачка',
    icon: <NavLaundressIcon />,
    menu: true,
    children: [
      {
        key: 'laundry-washings',
        label: 'Стирки',
        path: '/laundry/washings',
        menu: true,
      },
      {
        key: 'laundry-items',
        label: 'Предметы',
        path: '/laundry/items',
        menu: true,
      },
      {
        key: 'laundry-orders',
        label: 'Заказы',
        path: '/laundry/orders',
        menu: true,
      },
    ],
  },
  {
    key: 'admin',
    label: 'Администрирование',
    icon: <NavStaffIcon />,
    path: '/admin',
    access: ['MANAGER'],
    menu: true,
  },
];
