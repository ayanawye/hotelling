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
        path: 'floors/create',
        element: <Pages.RoomsFloorsCreatePage />,
      },
      {
        path: 'floors/edit/:id',
        element: <Pages.RoomsFloorsEditPage />,
      },
      {
        path: 'types',
        element: <Pages.RoomsTypesPage />,
      },
      {
        path: 'types/create',
        element: <Pages.RoomsTypesCreatePage />,
      },
      {
        path: 'types/edit/:id',
        element: <Pages.RoomsTypesEditPage />,
      },
      {
        path: 'status',
        element: <Pages.RoomsStatusPage />,
      },
      {
        path: 'status/create',
        element: <Pages.RoomsStatusCreatePage />,
      },
      {
        path: 'status/edit/:id',
        element: <Pages.RoomsStatusEditPage />,
      },
      {
        path: 'stock',
        element: <Pages.RoomsStockPage />,
      },
      {
        path: 'stock/create',
        element: <Pages.RoomsStockCreatePage />,
      },
      {
        path: 'stock/edit/:id',
        element: <Pages.RoomsStockEditPage />,
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
        path: 'taxes/create',
        element: <Pages.FinanceTaxesCreatePage />,
      },
      {
        path: 'taxes/edit/:id',
        element: <Pages.FinanceTaxesEditPage />,
      },
      {
        path: 'currencies',
        element: <Pages.FinanceCurrenciesPage />,
      },
      {
        path: 'currencies/create',
        element: <Pages.FinanceCurrenciesCreatePage />,
      },
      {
        path: 'currencies/edit/:id',
        element: <Pages.FinanceCurrenciesEditPage />,
      },
      {
        path: 'payment-types',
        element: <Pages.FinancePaymentTypesPage />,
      },
      {
        path: 'payment-types/create',
        element: <Pages.FinancePaymentTypesCreatePage />,
      },
      {
        path: 'payment-types/edit/:id',
        element: <Pages.FinancePaymentTypesEditPage />,
      },
      {
        path: 'payments',
        element: <Pages.FinancePaymentsPage />,
      },
      {
        path: 'payments/create',
        element: <Pages.FinancePaymentsCreatePage />,
      },
      {
        path: 'payments/edit/:id',
        element: <Pages.FinancePaymentsEditPage />,
      },
      {
        path: 'folio',
        element: <Pages.FinanceFolioPage />,
      },
      {
        path: 'folio/create',
        element: <Pages.FinanceFolioCreatePage />,
      },
      {
        path: 'folio/edit/:id',
        element: <Pages.FinanceFolioEditPage />,
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
