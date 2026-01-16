import { Restricted } from '@shared/ui/Restricted/Restricted.tsx';

import type { IAccessRouteObject, UserRole } from '../config/types';

/**
 * Фильтрует роуты на основе роли пользователя.
 * Если у пользователя нет доступа, заменяет элемент на <Restricted />.
 */
export function getRoutesByUser(
  routes: IAccessRouteObject[],
  userRole: UserRole,
): IAccessRouteObject[] {
  return routes.map((route) => {
    const hasAccess = !route.access || route.access.includes(userRole);

    const filteredRoute: IAccessRouteObject = {
      ...route,
      element: hasAccess ? route.element : <Restricted />,
    };

    if (route.children) {
      filteredRoute.children = getRoutesByUser(route.children, userRole);
    }

    return filteredRoute;
  });
}
