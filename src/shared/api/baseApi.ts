import type { RootState } from '@app/store/store.ts';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Token } from '@shared/hooks/token.ts';
import type { AuthResponse } from '@entities/user/types';
import { setToken } from '@entities/user/model/slice.ts';

const { VITE_API_MAIN_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_API_MAIN_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token?.access || Token.getToken()?.access;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = Token.getToken()?.refresh;
    if (!refreshToken) {
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const userType = Token.getToken();
      const newTokens = {
        ...userType,
        ...(refreshResult.data as AuthResponse),
      };
      Token.setToken(newTokens);
      api.dispatch(setToken(newTokens));

      result = await baseQuery(args, api, extraOptions);
    } else {
      Token.removeToken();
      window.location.href = '/';
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Booking',
    'HOTEL_ENCLOSURE',
    'HOTEL_FLOOR',
    'HOTEL_ROOMS_TYPE',
    'HOTEL_ROOM_STATUS',
    'HOTEL_ROOM_STOCK',
    'FINANCE_TAX',
    'FINANCE_CURRENCY',
    'FINANCE_PAYMENT_TYPE',
    'PAYMENT',
    'FOLIO_TRANSACTION',
    'ORGANIZATION',
    'ORGANIZATION_TYPE',
    'HOTEL_SETTINGS',
  ],
  endpoints: () => ({}),
});
