import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const savedToken = localStorage.getItem('token');

const initialState: AuthState = {
  user: null,
  token: savedToken,
  isAuthenticated: !!savedToken,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, access },
      }: PayloadAction<{ user: User; access: string }>,
    ) => {
      state.user = user;
      state.token = access;
      state.isAuthenticated = true;
      localStorage.setItem('token', access);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
