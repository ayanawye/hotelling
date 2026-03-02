import { baseApi } from '@shared/api/baseApi';
import type {
  ICleaningWorker,
  ICreateWashingRequest,
  IWashing,
} from '../model/types';

export const washingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCleaningWorkers: builder.query<ICleaningWorker[], void>({
      query: () => ({
        url: 'cleaning/workers/',
      }),
    }),
    getAllWashings: builder.query<IWashing[], void>({
      query: () => ({
        url: 'laundry/laundry/laundries/',
        method: 'GET',
      }),
      providesTags: ['WASHING'],
    }),
    createWashing: builder.mutation<IWashing, ICreateWashingRequest>({
      query: (body) => ({
        url: 'laundry/laundry/laundries/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WASHING'],
    }),
    getWashingById: builder.query<IWashing, number>({
      query: (id) => ({
        url: `laundry/laundry/laundries/${id}/`,
        method: 'GET',
      }),
      providesTags: ['WASHING'],
    }),
    patchWashing: builder.mutation<void, any>({
      query: (body) => ({
        url: `laundry/laundry/laundries/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['WASHING'],
    }),
    deleteWashing: builder.mutation<void, number>({
      query: (id) => ({
        url: `laundry/laundry/laundries/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WASHING'],
    }),
  }),
});

export const {
  useGetAllWashingsQuery,
  useGetCleaningWorkersQuery,
  useCreateWashingMutation,
  useGetWashingByIdQuery,
  usePatchWashingMutation,
  useDeleteWashingMutation,
} = washingApi;
