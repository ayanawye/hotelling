import { baseApi } from '@shared/api/baseApi';
import type { IConsumable } from '../model/types';

export const breakdownApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsumableBreakdowns: builder.query<IConsumable[], void>({
      query: () => ({
        url: 'consumable/breakdowns/',
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE_BREAKDOWN'],
    }),
    createConsumableBreakdown: builder.mutation<void, Partial<IConsumable>>({
      query: (body) => ({
        url: 'consumable/breakdowns/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CONSUMABLE_BREAKDOWN'],
    }),
    getConsumableBreakdownById: builder.query<IConsumable, number>({
      query: (id) => ({
        url: `consumable/breakdowns/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE_BREAKDOWN'],
    }),
    patchConsumableBreakdown: builder.mutation<
      void,
      Partial<IConsumable> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `consumable/breakdowns/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CONSUMABLE_BREAKDOWN'],
    }),
    deleteConsumableBreakdown: builder.mutation<void, number>({
      query: (id) => ({
        url: `consumable/breakdowns/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CONSUMABLE_BREAKDOWN'],
    }),
  }),
});

export const {
  useGetConsumableBreakdownsQuery,
  useCreateConsumableBreakdownMutation,
  useGetConsumableBreakdownByIdQuery,
  usePatchConsumableBreakdownMutation,
  useDeleteConsumableBreakdownMutation,
} = breakdownApi;
