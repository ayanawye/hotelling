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
export const RoomsFloorsCreatePage = Loadable(
  lazy(() => import('@pages/Rooms/Floors/FloorsCreate')),
);
export const RoomsFloorsEditPage = Loadable(
  lazy(() => import('@pages/Rooms/Floors/FloorsEdit')),
);
export const RoomsTypesPage = Loadable(
  lazy(() => import('@pages/Rooms/Types')),
);
export const RoomsTypesCreatePage = Loadable(
  lazy(() => import('@pages/Rooms/Types/TypesCreate')),
);
export const RoomsTypesEditPage = Loadable(
  lazy(() => import('@pages/Rooms/Types/TypesEdit')),
);

export const RoomsStatusPage = Loadable(
  lazy(() => import('@pages/Rooms/Status')),
);
export const RoomsStatusCreatePage = Loadable(
  lazy(() => import('@pages/Rooms/Status/StatusCreate')),
);
export const RoomsStatusEditPage = Loadable(
  lazy(() => import('@pages/Rooms/Status/StatusEdit')),
);

export const RoomsStockPage = Loadable(
  lazy(() => import('@pages/Rooms/Stock')),
);
export const RoomsStockCreatePage = Loadable(
  lazy(() => import('@pages/Rooms/Stock/StockCreate')),
);
export const RoomsStockEditPage = Loadable(
  lazy(() => import('@pages/Rooms/Stock/StockEdit')),
);

// Finance
export const FinanceTaxesPage = Loadable(
  lazy(() => import('@pages/Finance/Taxes')),
);
export const FinanceTaxesCreatePage = Loadable(
  lazy(() => import('@pages/Finance/Taxes/TaxesCreate')),
);
export const FinanceTaxesEditPage = Loadable(
  lazy(() => import('@pages/Finance/Taxes/TaxesEdit')),
);

export const FinanceCurrenciesPage = Loadable(
  lazy(() => import('@pages/Finance/Currencies')),
);
export const FinanceCurrenciesCreatePage = Loadable(
  lazy(() => import('@pages/Finance/Currencies/CurrenciesCreate')),
);

export const FinancePaymentTypesPage = Loadable(
  lazy(() => import('@pages/Finance/PaymentTypes')),
);
export const FinancePaymentTypesCreatePage = Loadable(
  lazy(() => import('@pages/Finance/PaymentTypes/PaymentTypesCreate')),
);
export const FinancePaymentTypesEditPage = Loadable(
  lazy(() => import('@pages/Finance/PaymentTypes/PaymentTypesEdit')),
);

export const FinancePaymentsPage = Loadable(
  lazy(() => import('@pages/Finance/Payments')),
);
export const FinancePaymentsCreatePage = Loadable(
  lazy(() => import('@pages/Finance/Payments/PaymentsCreate')),
);
export const FinancePaymentsEditPage = Loadable(
  lazy(() => import('@pages/Finance/Payments/PaymentsEdit')),
);

export const FinanceFolioPage = Loadable(
  lazy(() => import('@pages/Finance/Folio')),
);
export const FinanceFolioCreatePage = Loadable(
  lazy(() => import('@pages/Finance/Folio/FolioCreate')),
);
export const FinanceFolioEditPage = Loadable(
  lazy(() => import('@pages/Finance/Folio/FolioEdit')),
);

// Organizations
export const OrganizationsTypesPage = Loadable(
  lazy(() => import('@pages/Organizations/Types')),
);
export const OrganizationsAllPage = Loadable(
  lazy(() => import('@pages/Organizations/All')),
);
export const OrganizationCreatePage = Loadable(
  lazy(
    () =>
      import('@pages/Organizations/All/OrganizationCreate/OrganizationCreate'),
  ),
);
export const OrganizationEditPage = Loadable(
  lazy(
    () => import('@pages/Organizations/All/OrganizationEdit/OrganizationEdit'),
  ),
);

// Tariff
export const TariffHotelPage = Loadable(
  lazy(() => import('@pages/Tariff/Hotel')),
);
export const HotelTariffCreatePage = Loadable(
  lazy(() => import('@pages/Tariff/Hotel/HotelTariffCreate/HotelTariffCreate')),
);
export const HotelTariffEditPage = Loadable(
  lazy(() => import('@pages/Tariff/Hotel/HotelTariffEdit/HotelTariffEdit')),
);

export const TariffOrganizationsPage = Loadable(
  lazy(() => import('@pages/Tariff/Organizations')),
);

export const TariffOrganizationsCreatePage = Loadable(
  lazy(
    () =>
      import('@pages/Tariff/Organizations/OrganizationTariffCreate/OrganizationTariffCreate'),
  ),
);
export const TariffOrganizationsEditPage = Loadable(
  lazy(
    () =>
      import('@pages/Tariff/Organizations/OrganizationTariffEdit/OrganizationTariffEdit'),
  ),
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
