import { baseApi } from '@shared/api/baseApi';

import type { AuthResponse, LoginDto, User } from '../types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginDto>({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: 'auth/me/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyGetMeQuery } = authApi;
