import { baseApi } from '@shared/api/baseApi';
import type { IServiceCategory } from '@entities/services/types';

export const serviceCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceCategories: builder.query<IServiceCategory[], void>({
      query: () => ({
        url: 'services/categories/',
        method: 'GET',
      }),
      providesTags: ['SERVICE_CATEGORY'],
    }),
    createServiceCategory: builder.mutation<void, IServiceCategory>({
      query: (body) => ({
        url: 'services/categories/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SERVICE_CATEGORY'],
    }),
    getServiceCategoryById: builder.query<IServiceCategory, number>({
      query: (id) => ({
        url: `services/categories/${id}/`,
        method: 'GET',
      }),
      providesTags: ['SERVICE_CATEGORY'],
    }),
    patchServiceCategory: builder.mutation<void, any>({
      query: (body) => ({
        url: `services/categories/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['SERVICE_CATEGORY'],
    }),
    deleteServiceCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `services/categories/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SERVICE_CATEGORY'],
    }),
  }),
});

export const {
  useGetServiceCategoriesQuery,
  useGetServiceCategoryByIdQuery,
  useCreateServiceCategoryMutation,
  usePatchServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = serviceCategoryApi;
