import { LoginPage } from '@pages/Login/ui/LoginPage';
import { RootLayout } from '@widgets/RootLayout';
import { Navigate, type RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { baseRoutes } from './config/base.routes';
import type { UserRole } from './config/types';
import { userRoutes } from './config/user.routes';
import { getRoutesByUser } from './lib/getRoutesByUser';

export const createAppRouter = (userRole: UserRole, isGuest: boolean) => {
  if (isGuest) {
    return createBrowserRouter([
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to='/login' replace />,
      },
    ]);
  }

  const filteredBaseRoutes = getRoutesByUser(baseRoutes, userRole);
  const filteredUserRoutes = getRoutesByUser(userRoutes, userRole);

  return createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        ...filteredBaseRoutes,
        ...filteredUserRoutes,
        {
          path: '/login',
          element: <Navigate to='/' replace />,
        },
      ] as RouteObject[],
    },
  ]);
};
