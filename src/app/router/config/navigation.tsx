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
        children: [
          {
            key: 'rooms-floors/create',
            label: 'Создать этаж',
            path: '/rooms/floors/create',
            menu: false,
          },
          {
            key: 'rooms-floors/edit',
            label: 'Изменить этаж',
            path: '/rooms/floors/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'rooms-types',
        label: 'Типы номеров',
        path: '/rooms/types',
        menu: true,
        children: [
          {
            key: 'rooms-types/create',
            label: 'Создать тип номера',
            path: '/rooms/types/create',
            menu: false,
          },
          {
            key: 'rooms-types/edit',
            label: 'Изменить тип номера',
            path: '/rooms/types/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'rooms-status',
        label: 'Статус номеров',
        path: '/rooms/status',
        menu: true,
        children: [
          {
            key: 'rooms-status/create',
            label: 'Создать статус',
            path: '/rooms/status/create',
            menu: false,
          },
          {
            key: 'rooms-status/edit',
            label: 'Изменить статус',
            path: '/rooms/status/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'rooms-stock',
        label: 'Номерной фонд',
        path: '/rooms/stock',
        menu: true,
        children: [
          {
            key: 'rooms-stock/create',
            label: 'Создать номер',
            path: '/rooms/stock/create',
            menu: false,
          },
          {
            key: 'rooms-stock/edit',
            label: 'Изменить номер',
            path: '/rooms/stock/edit/:id',
            menu: false,
          },
        ],
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
        children: [
          {
            key: 'finance-taxes/create',
            label: 'Создать налог',
            path: '/finance/taxes/create',
            menu: false,
          },
          {
            key: 'finance-taxes/edit',
            label: 'Изменить налог',
            path: '/finance/taxes/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'finance-currencies',
        label: 'Валюты',
        path: '/finance/currencies',
        menu: true,
        children: [
          {
            key: 'finance-currencies/create',
            label: 'Создать валюту',
            path: '/finance/currencies/create',
            menu: false,
          },
        ],
      },
      {
        key: 'finance-payment-types',
        label: 'Типы оплаты',
        path: '/finance/payment-types',
        menu: true,
        children: [
          {
            key: 'finance-payment-types/create',
            label: 'Создать тип оплаты',
            path: '/finance/payment-types/create',
            menu: false,
          },
          {
            key: 'finance-payment-types/edit',
            label: 'Изменить тип оплаты',
            path: '/finance/payment-types/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'finance-payments',
        label: 'Платежи',
        path: '/finance/payments',
        menu: true,
        children: [
          {
            key: 'finance-payments/create',
            label: 'Создать платеж',
            path: '/finance/payments/create',
            menu: false,
          },
          {
            key: 'finance-payments/edit',
            label: 'Изменить платеж',
            path: '/finance/payments/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'finance-folio',
        label: 'Фолио',
        path: '/finance/folio',
        menu: true,
        children: [
          {
            key: 'finance-folio/create',
            label: 'Создать транзакцию',
            path: '/finance/folio/create',
            menu: false,
          },
          {
            key: 'finance-folio/edit',
            label: 'Изменить транзакцию',
            path: '/finance/folio/edit/:id',
            menu: false,
          },
        ],
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
        children: [
          {
            key: 'organizations-types-create',
            label: 'Создание типа организации',
            path: '/organizations/types/create',
            menu: false,
          },
          {
            key: 'organizations-типа-create',
            label: 'Изменение типа организации',
            path: '/organizations/types/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'organizations-all',
        label: 'Все организации',
        path: '/organizations/all',
        menu: true,
        children: [
          {
            key: 'organizations-all-create',
            label: 'Создание организации',
            path: '/organizations/all/create',
            menu: false,
          },
          {
            key: 'organizations-all-create',
            label: 'Изменение организации',
            path: '/organizations/all/edit/:id',
            menu: false,
          },
        ],
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
        children: [
          {
            key: 'tariff-hotel-tariff',
            label: 'Создать тариф',
            path: '/tariff/hotel/create',
            menu: false,
          },
          {
            key: 'tariff-hotel-tariff-edit',
            label: 'Изменить тариф',
            path: '/tariff/hotel/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'tariff-organizations',
        label: 'Организации',
        path: '/tariff/organizations',
        menu: true,
        children: [
          {
            key: 'tariff-organizations-tariff',
            label: 'Создать тариф',
            path: '/tariff/organizations/create',
            menu: false,
          },
          {
            key: 'tariff-organizations-edit',
            label: 'Изменить тариф',
            path: '/tariff/organizations/edit/:id',
            menu: false,
          },
        ],
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
        children: [
          {
            key: 'services-categories-create',
            label: 'Создать категорию',
            path: '/services/categories/create',
            menu: false,
          },
          {
            key: 'services-categories-edit',
            label: 'Изменить категорию',
            path: '/services/categories/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'services-all',
        label: 'Все',
        path: '/services/all',
        menu: true,
        children: [
          {
            key: 'services-all-create',
            label: 'Создать услугу',
            path: '/services/all/create',
            menu: false,
          },
          {
            key: 'services-all-edit',
            label: 'Изменить услугу',
            path: '/services/all/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'services-orders',
        label: 'Заказы услуг',
        path: '/services/orders',
        menu: true,
        children: [
          {
            key: 'services-orders-create',
            label: 'Создать услугу',
            path: '/services/orders/create',
            menu: false,
          },
          {
            key: 'services-orders-edit',
            label: 'Изменить услугу',
            path: '/services/orders/edit/:id',
            menu: false,
          },
        ],
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
        children: [
          {
            key: 'consumables-categories-create',
            label: 'Создание категории',
            path: '/consumables/categories/create',
            menu: false,
          },
          {
            key: 'consumables-categories-create',
            label: 'Изменение категории',
            path: '/consumables/categories/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'consumables-all',
        label: 'Все расходники',
        path: '/consumables/all',
        menu: true,
        children: [
          {
            key: 'consumables-all-create',
            label: 'Создание расходника',
            path: '/consumables/all/create',
            menu: false,
          },
          {
            key: 'consumables-all-create',
            label: 'Изменение расходника',
            path: '/consumables/all/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'consumables-breakdowns',
        label: 'Поломки',
        path: '/consumables/breakdowns',
        menu: true,
        children: [
          {
            key: 'consumables-breakdowns-create',
            label: 'Создать',
            path: '/consumables/breakdowns/create',
            menu: false,
          },
          {
            key: 'consumables-breakdowns-create',
            label: 'Изменить',
            path: '/consumables/breakdowns/edit/:id',
            menu: false,
          },
        ],
      },
      {
        key: 'consumables-used',
        label: 'Использованные',
        path: '/consumables/used',
        menu: true,
        children: [
          {
            key: 'consumables-used-create',
            label: 'Создать',
            path: '/consumables/used/create',
            menu: false,
          },
          {
            key: 'consumables-used-create',
            label: 'Изменить',
            path: '/consumables/used/edit/:id',
            menu: false,
          },
        ],
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
