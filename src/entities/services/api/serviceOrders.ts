import { baseApi } from '@shared/api/baseApi';
import type { IServiceOrder } from '@entities/services/types';

export const serviceOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceOrders: builder.query<IServiceOrder[], void>({
      query: () => ({
        url: 'services/orders/',
        method: 'GET',
      }),
      providesTags: ['SERVICE_ORDER'],
    }),
    createServiceOrder: builder.mutation<void, IServiceOrder>({
      query: (body) => ({
        url: 'services/orders/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SERVICE_ORDER'],
    }),
    getServiceOrderById: builder.query<IServiceOrder, number>({
      query: (id) => ({
        url: `services/orders/${id}/`,
        method: 'GET',
      }),
      providesTags: ['SERVICE_ORDER'],
    }),
    patchServiceOrder: builder.mutation<void, any>({
      query: (body) => ({
        url: `services/orders/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['SERVICE_ORDER'],
    }),
    deleteServiceOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `services/orders/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SERVICE_ORDER'],
    }),
  }),
});

export const {
  useGetServiceOrdersQuery,
  useGetServiceOrderByIdQuery,
  useCreateServiceOrderMutation,
  usePatchServiceOrderMutation,
  useDeleteServiceOrderMutation,
} = serviceOrdersApi;
