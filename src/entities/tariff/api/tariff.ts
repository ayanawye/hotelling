import { baseApi } from '@shared/api/baseApi';

import type { ITariff } from '@entities/tariff/types';

export const tariffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariff: builder.query<ITariff[], void>({
      query: () => ({
        url: 'tariff/',
        method: 'GET',
      }),
      providesTags: ['TARIFF'],
    }),
    createTariff: builder.mutation<void, ITariff>({
      query: (body) => ({
        url: 'tariff/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TARIFF'],
    }),
    getTariffById: builder.query<ITariff, number>({
      query: (id) => ({
        url: `tariff/${id}/`,
        method: 'GET',
      }),
    }),
    patchTariff: builder.mutation<void, any>({
      query: (body) => ({
        url: `tariff/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['TARIFF'],
    }),
    deleteTariff: builder.mutation<void, number>({
      query: (id) => ({
        url: `tariff/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TARIFF'],
    }),
  }),
});

export const {
  useGetTariffQuery,
  useGetTariffByIdQuery,
  useCreateTariffMutation,
  useDeleteTariffMutation,
  usePatchTariffMutation,
} = tariffApi;
