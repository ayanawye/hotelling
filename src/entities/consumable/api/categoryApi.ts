import { baseApi } from '@shared/api/baseApi';
import type { IConsumableCategory } from '../model/types';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsumableCategories: builder.query<IConsumableCategory[], void>({
      query: () => ({
        url: 'consumable/categories/',
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE_CATEGORY'],
    }),
    createConsumableCategory: builder.mutation<
      void,
      Partial<IConsumableCategory>
    >({
      query: (body) => ({
        url: 'consumable/categories/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CONSUMABLE_CATEGORY'],
    }),
    getConsumableCategoryById: builder.query<IConsumableCategory, number>({
      query: (id) => ({
        url: `consumable/categories/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CONSUMABLE_CATEGORY'],
    }),
    patchConsumableCategory: builder.mutation<
      void,
      Partial<IConsumableCategory> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `consumable/categories/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CONSUMABLE_CATEGORY'],
    }),
    deleteConsumableCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `consumable/categories/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CONSUMABLE_CATEGORY'],
    }),
  }),
});

export const {
  useGetConsumableCategoriesQuery,
  useCreateConsumableCategoryMutation,
  useGetConsumableCategoryByIdQuery,
  usePatchConsumableCategoryMutation,
  useDeleteConsumableCategoryMutation,
} = categoryApi;
