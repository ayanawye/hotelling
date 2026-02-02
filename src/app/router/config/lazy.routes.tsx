import { Loadable } from '@shared/lib';
import { lazy } from 'react';

// Auth & General
export const NotFoundPage = Loadable(lazy(() => import('@pages/NotFound')));
export const LoginPage = Loadable(lazy(() => import('@pages/Login')));

// Bookings
export const BookingBoardPage = Loadable(
  lazy(() => import('@pages/Bookings/Board')),
);
export const BookingListPage = Loadable(
  lazy(() => import('@pages/Bookings/BoardList/BoardList')),
);
export const BookingCreatePage = Loadable(
  lazy(() => import('@pages/Bookings/CreateBooking/CreateBooking')),
);

export const BookingEditPage = Loadable(
  lazy(() => import('@pages/Bookings/EditBooking/EditBooking')),
);

// Hotel
export const HotelSettingPage = Loadable(
  lazy(() => import('@pages/Hotel/HotelSettings/HotelSettings')),
);

// Guests
export const GuestsPage = Loadable(lazy(() => import('@pages/Guests')));

// Rooms (Settings)
export const RoomsEnclosuresPage = Loadable(
  lazy(() => import('@pages/Rooms/Enclosures/EnclosuresList')),
);
export const RoomsEnclosuresCreatePage = Loadable(
  lazy(() => import('@pages/Rooms/Enclosures/EnclosuresCreate')),
);
export const RoomsEnclosuresEditPage = Loadable(
  lazy(() => import('@pages/Rooms/Enclosures/EnclosuresEdit')),
);

export const RoomsFloorsPage = Loadable(
  lazy(() => import('@pages/Rooms/Floors')),
);
export const RoomsTypesPage = Loadable(
  lazy(() => import('@pages/Rooms/Types')),
);
export const RoomsStatusPage = Loadable(
  lazy(() => import('@pages/Rooms/Status')),
);
export const RoomsStockPage = Loadable(
  lazy(() => import('@pages/Rooms/Stock')),
);

// Finance
export const FinanceTaxesPage = Loadable(
  lazy(() => import('@pages/Finance/Taxes')),
);
export const FinanceCurrenciesPage = Loadable(
  lazy(() => import('@pages/Finance/Currencies')),
);
export const FinancePaymentTypesPage = Loadable(
  lazy(() => import('@pages/Finance/PaymentTypes')),
);
export const FinancePaymentsPage = Loadable(
  lazy(() => import('@pages/Finance/Payments')),
);
export const FinanceFolioPage = Loadable(
  lazy(() => import('@pages/Finance/Folio')),
);

// Organizations
export const OrganizationsTypesPage = Loadable(
  lazy(() => import('@pages/Organizations/Types')),
);
export const OrganizationsAllPage = Loadable(
  lazy(() => import('@pages/Organizations/All')),
);

// Tariff
export const TariffHotelPage = Loadable(
  lazy(() => import('@pages/Tariff/Hotel')),
);
export const TariffOrganizationsPage = Loadable(
  lazy(() => import('@pages/Tariff/Organizations')),
);

// Services
export const ServicesCategoriesPage = Loadable(
  lazy(() => import('@pages/Services/Categories')),
);
export const ServicesAllPage = Loadable(
  lazy(() => import('@pages/Services/All')),
);
export const ServicesOrdersPage = Loadable(
  lazy(() => import('@pages/Services/Orders')),
);

// Consumables
export const ConsumablesCategoriesPage = Loadable(
  lazy(() => import('@pages/Consumables/Categories')),
);
export const ConsumablesAllPage = Loadable(
  lazy(() => import('@pages/Consumables/All')),
);
export const ConsumablesBreakdownsPage = Loadable(
  lazy(() => import('@pages/Consumables/Breakdowns')),
);
export const ConsumablesUsedPage = Loadable(
  lazy(() => import('@pages/Consumables/Used')),
);

// Staff
export const StaffAllPage = Loadable(lazy(() => import('@pages/Staff/All')));
export const StaffHistoryPage = Loadable(
  lazy(() => import('@pages/Staff/History')),
);

// Laundry
export const LaundryWashingsPage = Loadable(
  lazy(() => import('@pages/Laundry/Washings')),
);
export const LaundryItemsPage = Loadable(
  lazy(() => import('@pages/Laundry/Items')),
);
export const LaundryOrdersPage = Loadable(
  lazy(() => import('@pages/Laundry/Orders')),
);

// Admin
export const AdminPage = Loadable(
  lazy(() => import('@pages/Admin/ui/AdminPage')),
);
