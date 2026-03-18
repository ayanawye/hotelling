import { baseApi } from '@shared/api/baseApi';
import type { ICashShift } from '@entities/cash';

export const cashShiftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashShifts: builder.query<ICashShift[], void>({
      query: () => ({
        url: 'cashbox/sessions/',
        method: 'GET',
      }),
      providesTags: ['CASH_SHIFTS'],
    }),
    createCashShift: builder.mutation<void, Partial<ICashShift>>({
      query: (body) => ({
        url: 'cashbox/sessions/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CASH_CASH'],
    }),
    getCashShiftById: builder.query<ICashShift, number>({
      query: (id) => ({
        url: `cashbox/sessions/${id}/`,
        method: 'GET',
      }),
      providesTags: ['CASH_SHIFTS'],
    }),
    patchCashShift: builder.mutation<void, Partial<ICashShift>>({
      query: ({ id, ...body }) => ({
        url: `cashbox/sessions/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CASH_SHIFTS'],
    }),
    deleteCashShift: builder.mutation<void, number>({
      query: (id) => ({
        url: `cashbox/sessions/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CASH_SHIFTS'],
    }),
  }),
});

export const {
  useGetAllCashShiftsQuery,
  useGetCashShiftByIdQuery,
  useCreateCashShiftMutation,
  usePatchCashShiftMutation,
  useDeleteCashShiftMutation,
} = cashShiftApi;
