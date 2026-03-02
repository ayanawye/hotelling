import { baseApi } from '@shared/api/baseApi';
import type { ILaundryItem, ILaundryItemCategory } from '../model/types';

export const laundryItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLaundryItems: builder.query<ILaundryItem[], string | void>({
      query: (params) => ({
        url: 'laundry/laundry/items/',
        params: { item_type: params },
      }),
      providesTags: ['LAUNDRY_ITEMS'],
    }),
    getLaundryItemCategories: builder.query<ILaundryItemCategory[], void>({
      query: () => ({
        url: 'laundry/laundry/categories/',
      }),
    }),
    createLaundryItem: builder.mutation<ILaundryItem, any>({
      query: (body) => ({
        url: 'laundry/laundry/items/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LAUNDRY_ITEMS'],
    }),
    getLaundryItemById: builder.query<ILaundryItem, number>({
      query: (id) => ({
        url: `laundry/laundry/items/${id}/`,
        method: 'GET',
      }),
      providesTags: ['LAUNDRY_ITEMS'],
    }),
    patchLaundryItem: builder.mutation<void, any>({
      query: (body) => ({
        url: `laundry/laundry/items/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['LAUNDRY_ITEMS'],
    }),
    deleteLaundryItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `laundry/laundry/items/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LAUNDRY_ITEMS'],
    }),
  }),
});

export const {
  useGetLaundryItemsQuery,
  useGetLaundryItemByIdQuery,
  useGetLaundryItemCategoriesQuery,
  useCreateLaundryItemMutation,
  usePatchLaundryItemMutation,
  useDeleteLaundryItemMutation,
} = laundryItemApi;
