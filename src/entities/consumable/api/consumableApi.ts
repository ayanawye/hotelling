import { baseApi } from '@shared/api/baseApi';
import type { IConsumable } from '../model/types';

export const consumableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsumables: builder.query<IConsumable[], void>({
      query: () => ({
        url: 'consumable/consumables/',
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE'],
    }),
    createConsumable: builder.mutation<void, Partial<IConsumable>>({
      query: (body) => ({
        url: 'consumable/consumables/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CONSUMABLE'],
    }),
    getConsumableById: builder.query<IConsumable, number>({
      query: (id) => ({
        url: `consumable/consumables/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE'],
    }),
    patchConsumable: builder.mutation<void, { id: number; body: any }>({
      query: ({ id, body }) => ({
        url: `consumable/consumables/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CONSUMABLE'],
    }),
    deleteConsumable: builder.mutation<void, number>({
      query: (id) => ({
        url: `consumable/consumables/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CONSUMABLE'],
    }),
  }),
});

export const {
  useGetConsumablesQuery,
  useCreateConsumableMutation,
  useGetConsumableByIdQuery,
  usePatchConsumableMutation,
  useDeleteConsumableMutation,
} = consumableApi;
