import { baseApi } from '@shared/api/baseApi';
import type { ILaundryOrder } from '../model/types';

export const laundryOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLaundryOrders: builder.query<ILaundryOrder[], void>({
      query: () => ({
        url: 'laundry/laundry/orders/',
      }),
      providesTags: ['LAUNDRY_ORDER'],
    }),
    createLaundryOrder: builder.mutation<ILaundryOrder, any>({
      query: (body) => ({
        url: 'laundry/laundry/orders/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LAUNDRY_ORDER'],
    }),
    getLaundryOrderById: builder.query<ILaundryOrder, number>({
      query: (id) => ({
        url: `laundry/laundry/orders/${id}/`,
        method: 'GET',
      }),
      providesTags: ['LAUNDRY_ORDER'],
    }),
    patchLaundryOrder: builder.mutation<void, any>({
      query: (body) => ({
        url: `laundry/laundry/orders/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['LAUNDRY_ORDER'],
    }),
    deleteLaundryOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `laundry/laundry/orders/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LAUNDRY_ORDER'],
    }),
  }),
});

export const {
  useGetLaundryOrdersQuery,
  useGetLaundryOrderByIdQuery,
  useCreateLaundryOrderMutation,
  usePatchLaundryOrderMutation,
  useDeleteLaundryOrderMutation,
} = laundryOrderApi;
