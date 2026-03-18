import { baseApi } from '@shared/api/baseApi';
import type { ICash } from '@entities/cash';

export const cashApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashes: builder.query<ICash[], void>({
      query: () => ({
        url: 'cashbox/cashboxes/',
        method: 'GET',
      }),
      providesTags: ['CASH_CASH'],
    }),
    createCash: builder.mutation<void, Partial<ICash>>({
      query: (body) => ({
        url: 'cashbox/cashboxes/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CASH_CASH'],
    }),
    getCashById: builder.query<ICash, number>({
      query: (id) => ({
        url: `cashbox/cashboxes/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CASH_CASH'],
    }),
    patchCash: builder.mutation<void, Partial<ICash>>({
      query: ({ id, ...body }) => ({
        url: `cashbox/cashboxes/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CASH_CASH'],
    }),
    deleteCash: builder.mutation<void, number>({
      query: (id) => ({
        url: `cashbox/cashboxes/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CASH_CASH'],
    }),
  }),
});

export const {
  useGetAllCashesQuery,
  useGetCashByIdQuery,
  useCreateCashMutation,
  usePatchCashMutation,
  useDeleteCashMutation,
} = cashApi;
