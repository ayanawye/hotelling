import type { RouteObject } from 'react-router-dom';

export type UserRole = 'RECEPTIONIST' | 'MANAGER';

export type IAccessRouteObject = RouteObject & {
  access?: UserRole[];
  children?: IAccessRouteObject[];
};
