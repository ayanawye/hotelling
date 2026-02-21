import { baseApi } from '@shared/api/baseApi';
import type { IPersonal } from '../model/types';

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffs: builder.query<IPersonal[], void>({
      query: () => ({
        url: 'personal/',
        method: 'GET',
      }),
      providesTags: ['STAFF'],
    }),
    getStaffById: builder.query<IPersonal, number>({
      query: (id) => ({
        url: `personal/${id}/`,
        method: 'GET',
      }),
      providesTags: ['STAFF'],
    }),
    createStaff: builder.mutation<IPersonal, Partial<IPersonal>>({
      query: (body) => ({
        url: 'personal/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['STAFF'],
    }),
    patchStaff: builder.mutation<
      IPersonal,
      Partial<IPersonal> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `personal/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['STAFF'],
    }),
    deleteStaff: builder.mutation<void, number>({
      query: (id) => ({
        url: `personal/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['STAFF'],
    }),
  }),
});

export const {
  useGetStaffsQuery,
  useGetStaffByIdQuery,
  useCreateStaffMutation,
  usePatchStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
