import type { AuthResponse } from '@entities/user/types';

export class Token {
  static getToken(): AuthResponse | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static setToken(data: AuthResponse | null) {
    localStorage.setItem('token', JSON.stringify(data));
  }
}
