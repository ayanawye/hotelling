import { baseApi } from '@shared/api/baseApi';

import type { IFinanceTax } from '@entities/finance/types';

export const taxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceTaxes: builder.query<IFinanceTax[], void>({
      query: () => ({
        url: 'finance/tax/',
        method: 'GET',
      }),
      providesTags: ['FINANCE_TAX'],
    }),
    createFinanceTax: builder.mutation<void, IFinanceTax>({
      query: (body) => ({
        url: 'finance/tax/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FINANCE_TAX'],
    }),
    getFinanceTaxById: builder.query<IFinanceTax, number>({
      query: (id) => ({
        url: `finance/tax/${id}/`,
        method: 'GET',
      }),
    }),
    patchFinanceTax: builder.mutation<void, IFinanceTax>({
      query: (body) => ({
        url: `finance/tax/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['FINANCE_TAX'],
    }),
    deleteFinanceTax: builder.mutation<void, number>({
      query: (id) => ({
        url: `finance/tax/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FINANCE_TAX'],
    }),
  }),
});

export const {
  useGetFinanceTaxesQuery,
  useCreateFinanceTaxMutation,
  useGetFinanceTaxByIdQuery,
  usePatchFinanceTaxMutation,
  useDeleteFinanceTaxMutation,
} = taxApi;
