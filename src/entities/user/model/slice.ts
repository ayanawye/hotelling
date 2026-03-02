import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthResponse, User } from '../types';
import { Token } from '@shared/hooks/token.ts';
import type { RootState } from '@app/store/store.ts';

interface AuthState {
  user: User | null;
  token?: AuthResponse | null;
  isAuthenticated?: boolean;
}

const savedToken = Token.getToken();

const initialState: AuthState = {
  user: null,
  token: savedToken,
  isAuthenticated: !!savedToken,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<AuthState>) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    setToken: (state, { payload }: PayloadAction<AuthResponse | null>) => {
      state.token = payload;
      Token.setToken(payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Token.removeToken();
    },
  },
});

export const { setCredentials, setToken, logout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
