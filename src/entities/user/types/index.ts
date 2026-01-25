import type { UserRole } from '@app/router/config/types';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginDto {
  username: string;
  password: string;
}
