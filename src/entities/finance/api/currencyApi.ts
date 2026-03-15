import { baseApi } from '@shared/api/baseApi';

import type {
  IFinanceCurrency,
  IFinanceCurrencyFilter,
} from '@entities/finance/types';

export const currencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceCurrencies: builder.query<
      IFinanceCurrency[],
      IFinanceCurrencyFilter | void
    >({
      query: (params) => ({
        url: 'finance/currency/',
        method: 'GET',
        params: params ?? {},
      }),
      providesTags: ['FINANCE_CURRENCY'],
    }),
    createFinanceCurrency: builder.mutation<void, IFinanceCurrency>({
      query: (body) => ({
        url: 'finance/currency/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FINANCE_CURRENCY'],
    }),
    getFinanceCurrencyById: builder.query<IFinanceCurrency, number>({
      query: (id) => ({
        url: `finance/currency/${id}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'FINANCE_CURRENCY', id }],
    }),
    patchFinanceCurrency: builder.mutation<void, IFinanceCurrency>({
      query: (body) => ({
        url: `finance/currency/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['FINANCE_CURRENCY'],
    }),
    deleteFinanceCurrency: builder.mutation<void, number>({
      query: (id) => ({
        url: `finance/currency/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FINANCE_CURRENCY'],
    }),
  }),
});

export const {
  useGetFinanceCurrenciesQuery,
  useCreateFinanceCurrencyMutation,
  useGetFinanceCurrencyByIdQuery,
  usePatchFinanceCurrencyMutation,
  useDeleteFinanceCurrencyMutation,
} = currencyApi;
