import { baseApi } from '@shared/api/baseApi';
import type { ICashBalance } from '@entities/cash';

export const cashBalanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashBalance: builder.query<ICashBalance[], void>({
      query: () => ({
        url: 'cashbox/balances/',
        method: 'GET',
      }),
      providesTags: ['CASH_BALANCE'],
    }),
    getCashBalanceById: builder.query<ICashBalance, number>({
      query: (id) => ({
        url: `cashbox/balances/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CASH_BALANCE'],
    }),
  }),
});

export const { useGetAllCashBalanceQuery, useGetCashBalanceByIdQuery } =
  cashBalanceApi;
