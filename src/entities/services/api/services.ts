import { baseApi } from '@shared/api/baseApi';
import type { IService } from '@entities/services/types';

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<IService[], void>({
      query: () => ({
        url: 'services/',
        method: 'GET',
      }),
      providesTags: ['SERVICE'],
    }),
    createService: builder.mutation<void, IService>({
      query: (body) => ({
        url: 'services/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SERVICE'],
    }),
    getServiceById: builder.query<IService, number>({
      query: (id) => ({
        url: `services/${id}/`,
        method: 'GET',
      }),
      providesTags: ['SERVICE'],
    }),
    patchService: builder.mutation<void, any>({
      query: (body) => ({
        url: `services/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['SERVICE'],
    }),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({
        url: `services/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SERVICE'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  usePatchServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
