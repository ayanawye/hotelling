import { RootLayout } from '@widgets/RootLayout';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { baseRoutes } from './config/base.routes';
import type { UserRole } from './config/types';
import { userRoutes } from './config/user.routes';
import { getRoutesByUser } from './lib/getRoutesByUser';

export const createAppRouter = (userRole: UserRole) => {
  const filteredUserRoutes = getRoutesByUser(userRoutes, userRole);

  return createBrowserRouter([
    {
      element: <RootLayout />,
      children: [...baseRoutes, ...filteredUserRoutes] as RouteObject[],
    },
  ]);
};
