import { baseApi } from '@shared/api/baseApi';

import type { IPayment, ITransactionCheck } from '@entities/finance/types';

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<IPayment[], void>({
      query: () => ({
        url: 'payments/',
        method: 'GET',
      }),
      providesTags: ['PAYMENT'],
    }),
    acceptPayment: builder.mutation<void, Partial<IPayment>>({
      query: (body) => ({
        url: 'payments/accept/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PAYMENT'],
    }),
    checkPayment: builder.query<ITransactionCheck[], void>({
      query: () => ({
        url: 'payments/check/',
        method: 'GET',
      }),
    }),
    getPaymentById: builder.query<IPayment, number>({
      query: (id) => ({
        url: `payments/${id}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'PAYMENT', id }],
    }),
    voidPayment: builder.mutation<void, number>({
      query: (id) => ({
        url: `payments/${id}/void/`,
        method: 'POST',
      }),
      invalidatesTags: ['PAYMENT'],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useAcceptPaymentMutation,
  useCheckPaymentQuery,
  useGetPaymentByIdQuery,
  useVoidPaymentMutation,
} = paymentsApi;
