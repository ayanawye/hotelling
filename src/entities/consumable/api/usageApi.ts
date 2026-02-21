import { baseApi } from '@shared/api/baseApi';
import type { IConsumableUsage } from '../model/types';

export const usageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsumableUsages: builder.query<IConsumableUsage[], void>({
      query: () => ({
        url: 'consumable/consumable-usages/',
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE_USAGE'],
    }),
    getConsumableUsageById: builder.query<IConsumableUsage, number>({
      query: (id) => ({
        url: `consumable/consumable-usages/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE_USAGE'],
    }),
    createConsumableUsage: builder.mutation<void, Partial<IConsumableUsage>>({
      query: (body) => ({
        url: 'consumable/consumable-usages/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CONSUMABLE_USAGE'],
    }),
    patchConsumableUsage: builder.mutation<
      void,
      Partial<IConsumableUsage> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `consumable/consumable-usages/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CONSUMABLE_USAGE'],
    }),
    deleteConsumableUsage: builder.mutation<void, number>({
      query: (id) => ({
        url: `consumable/consumable-usages/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CONSUMABLE_USAGE'],
    }),
  }),
});

export const {
  useGetConsumableUsagesQuery,
  useGetConsumableUsageByIdQuery,
  useCreateConsumableUsageMutation,
  usePatchConsumableUsageMutation,
  useDeleteConsumableUsageMutation,
} = usageApi;
