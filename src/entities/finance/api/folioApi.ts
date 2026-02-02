import { baseApi } from '@shared/api/baseApi';

import type { IFolioTransaction } from '@entities/finance/types';

export const folioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFolioTransactions: builder.query<IFolioTransaction[], void>({
      query: () => ({
        url: 'folio/transactions/',
        method: 'GET',
      }),
      providesTags: ['FOLIO_TRANSACTION'],
    }),
    createFolioTransaction: builder.mutation<void, IFolioTransaction>({
      query: (body) => ({
        url: 'folio/transactions/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FOLIO_TRANSACTION'],
    }),
    getFolioTransactionById: builder.query<IFolioTransaction, number>({
      query: (id) => ({
        url: `folio/transactions/${id}/`,
        method: 'GET',
      }),
    }),
    patchFolioTransaction: builder.mutation<void, IFolioTransaction>({
      query: (body) => ({
        url: `folio/transactions/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['FOLIO_TRANSACTION'],
    }),
    deleteFolioTransaction: builder.mutation<void, number>({
      query: (id) => ({
        url: `folio/transactions/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FOLIO_TRANSACTION'],
    }),
  }),
});

export const {
  useGetFolioTransactionsQuery,
  useCreateFolioTransactionMutation,
  useGetFolioTransactionByIdQuery,
  usePatchFolioTransactionMutation,
  useDeleteFolioTransactionMutation,
} = folioApi;
