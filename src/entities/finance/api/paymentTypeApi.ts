import { baseApi } from '@shared/api/baseApi';

import type { IFinancePaymentType } from '@entities/finance/types';

export const paymentTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinancePaymentTypes: builder.query<IFinancePaymentType[], void>({
      query: () => ({
        url: 'finance/payment_type/',
        method: 'GET',
      }),
      providesTags: ['FINANCE_PAYMENT_TYPE'],
    }),
    createFinancePaymentType: builder.mutation<void, IFinancePaymentType>({
      query: (body) => ({
        url: 'finance/payment_type/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FINANCE_PAYMENT_TYPE'],
    }),
    getFinancePaymentTypeById: builder.query<IFinancePaymentType, number>({
      query: (id) => ({
        url: `finance/payment_type/${id}/`,
        method: 'GET',
      }),
    }),
    patchFinancePaymentType: builder.mutation<void, IFinancePaymentType>({
      query: (body) => ({
        url: `finance/payment_type/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['FINANCE_PAYMENT_TYPE'],
    }),
    deleteFinancePaymentType: builder.mutation<void, number>({
      query: (id) => ({
        url: `finance/payment_type/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FINANCE_PAYMENT_TYPE'],
    }),
  }),
});

export const {
  useGetFinancePaymentTypesQuery,
  useCreateFinancePaymentTypeMutation,
  useGetFinancePaymentTypeByIdQuery,
  usePatchFinancePaymentTypeMutation,
  useDeleteFinancePaymentTypeMutation,
} = paymentTypeApi;
