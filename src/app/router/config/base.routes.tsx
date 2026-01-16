import { Loadable } from '@shared/lib/Loadable.tsx';
import { lazy } from 'react';

import type { IAccessRouteObject } from './types';

const NotFoundPage = Loadable(lazy(() => import('../../../pages/NotFound')));
const BookingListPage = Loadable(
  lazy(() => import('../../../pages/Booking/BookingListPage')),
);

export const baseRoutes: IAccessRouteObject[] = [
  {
    path: '/bookings',
    children: [
      {
        path: 'board',
        element: <>Board</>,
      },
      {
        path: 'list',
        element: <BookingListPage />,
      },
    ],
  },
  {
    path: '/hotel',
    children: [
      {
        path: 'rooms',
        element: <>rooms</>,
      },
      {
        path: 'staff',
        element: <>staff</>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
