import { Loadable } from '@shared/lib/Loadable.tsx';
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
