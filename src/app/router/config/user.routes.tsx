import { Loadable } from '@shared/lib';
import { lazy } from 'react';

import type { IAccessRouteObject } from './types';

const AdminPage = Loadable(
  lazy(() => import('../../../pages/Admin/ui/AdminPage')),
);

export const userRoutes: IAccessRouteObject[] = [
  {
    path: '/admin',
    element: <AdminPage />,
    access: ['MANAGER'],
  },
];
