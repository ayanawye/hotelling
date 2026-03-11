import { baseApi } from '@shared/api/baseApi';

import type { IGuest, IPassport } from '../types';
import type { IPagination } from '@shared/types';

export const guestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuests: builder.query<
      IPagination<IGuest>,
      { search?: string; status: string[] } | void
    >({
      query: (params) => ({
        url: 'guests/',
        method: 'GET',
        params: params ?? {},
      }),
    }),
    getGuestById: builder.query<IGuest, number>({
      query: (id) => ({
        url: `guests/${id}/`,
        method: 'GET',
      }),
    }),
    getGuestPassport: builder.query<IPassport, number>({
      query: (id) => ({
        url: `guests/${id}/passport/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetGuestsQuery,
  useGetGuestByIdQuery,
  useGetGuestPassportQuery,
} = guestsApi;
