import * as Pages from './lazy.routes';
import type { IAccessRouteObject } from './types';

export const baseRoutes: IAccessRouteObject[] = [
  {
    path: '/bookings',
    children: [
      {
        path: 'board',
        element: <Pages.BookingBoardPage />,
      },
      {
        path: 'list',
        element: <Pages.BookingListPage />,
      },
      {
        path: 'create',
        element: <Pages.BookingCreatePage />,
      },
      {
        path: 'edit/:id',
        element: <Pages.BookingEditPage />,
      },
    ],
  },
  {
    path: '/hotel',
    children: [
      {
        path: 'settings',
        element: <Pages.HotelSettingPage />,
      },
    ],
  },
  {
    path: '/guests',
    element: <Pages.GuestsPage />,
  },
  {
    path: '/rooms',
    children: [
      {
        path: 'enclosures',
        element: <Pages.RoomsEnclosuresPage />,
      },
      {
        path: 'enclosures/create',
        element: <Pages.RoomsEnclosuresCreatePage />,
      },
      {
        path: 'enclosures/edit/:id',
        element: <Pages.RoomsEnclosuresEditPage />,
      },
      {
        path: 'floors',
        element: <Pages.RoomsFloorsPage />,
      },
      {
        path: 'types',
        element: <Pages.RoomsTypesPage />,
      },
      {
        path: 'status',
        element: <Pages.RoomsStatusPage />,
      },
      {
        path: 'stock',
        element: <Pages.RoomsStockPage />,
      },
    ],
  },
  {
    path: '/finance',
    children: [
      {
        path: 'taxes',
        element: <Pages.FinanceTaxesPage />,
      },
      {
        path: 'currencies',
        element: <Pages.FinanceCurrenciesPage />,
      },
      {
        path: 'payment-types',
        element: <Pages.FinancePaymentTypesPage />,
      },
      {
        path: 'payments',
        element: <Pages.FinancePaymentsPage />,
      },
      {
        path: 'folio',
        element: <Pages.FinanceFolioPage />,
      },
    ],
  },
  {
    path: '/organizations',
    children: [
      {
        path: 'types',
        element: <Pages.OrganizationsTypesPage />,
      },
      {
        path: 'all',
        element: <Pages.OrganizationsAllPage />,
      },
    ],
  },
  {
    path: '/tariff',
    children: [
      {
        path: 'hotel',
        element: <Pages.TariffHotelPage />,
      },
      {
        path: 'organizations',
        element: <Pages.TariffOrganizationsPage />,
      },
    ],
  },
  {
    path: '/services',
    children: [
      {
        path: 'categories',
        element: <Pages.ServicesCategoriesPage />,
      },
      {
        path: 'all',
        element: <Pages.ServicesAllPage />,
      },
      {
        path: 'orders',
        element: <Pages.ServicesOrdersPage />,
      },
    ],
  },
  {
    path: '/consumables',
    children: [
      {
        path: 'categories',
        element: <Pages.ConsumablesCategoriesPage />,
      },
      {
        path: 'all',
        element: <Pages.ConsumablesAllPage />,
      },
      {
        path: 'breakdowns',
        element: <Pages.ConsumablesBreakdownsPage />,
      },
      {
        path: 'used',
        element: <Pages.ConsumablesUsedPage />,
      },
    ],
  },
  {
    path: '/staff',
    children: [
      {
        path: 'all',
        element: <Pages.StaffAllPage />,
      },
      {
        path: 'history',
        element: <Pages.StaffHistoryPage />,
      },
    ],
  },
  {
    path: '/laundry',
    children: [
      {
        path: 'washings',
        element: <Pages.LaundryWashingsPage />,
      },
      {
        path: 'items',
        element: <Pages.LaundryItemsPage />,
      },
      {
        path: 'orders',
        element: <Pages.LaundryOrdersPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Pages.NotFoundPage />,
  },
];
