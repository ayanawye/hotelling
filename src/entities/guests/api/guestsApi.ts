import { baseApi } from '@shared/api/baseApi';

import type { IGuest } from '../types';
import type { IPagination } from '@shared/types';

export const guestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuests: builder.query<IPagination<IGuest>, void>({
      query: () => ({
        url: 'guests/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGuestsQuery } = guestsApi;
