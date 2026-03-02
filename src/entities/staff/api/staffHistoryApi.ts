import { baseApi } from '@shared/api/baseApi';
import type { IPersonalHistory } from '../model/types';

export const staffHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffHistories: builder.query<IPersonalHistory[], void>({
      query: () => ({
        url: 'personal/personal-history/',
        method: 'GET',
      }),
      providesTags: ['STAFF_HISTORY'],
    }),
    getStaffHistoryById: builder.query<IPersonalHistory, number>({
      query: (id) => ({
        url: `personal/personal-history/${id}/`,
        method: 'GET',
      }),
      providesTags: ['STAFF_HISTORY'],
    }),
    createStaffHistory: builder.mutation<
      IPersonalHistory,
      Partial<IPersonalHistory>
    >({
      query: (body) => ({
        url: 'personal/personal-history/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['STAFF_HISTORY'],
    }),
    patchStaffHistory: builder.mutation<
      IPersonalHistory,
      Partial<IPersonalHistory> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `personal/personal-history/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['STAFF_HISTORY'],
    }),
    deleteStaffHistory: builder.mutation<void, number>({
      query: (id) => ({
        url: `personal/personal-history/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['STAFF_HISTORY'],
    }),
  }),
});

export const {
  useGetStaffHistoriesQuery,
  useGetStaffHistoryByIdQuery,
  useCreateStaffHistoryMutation,
  usePatchStaffHistoryMutation,
  useDeleteStaffHistoryMutation,
} = staffHistoryApi;
