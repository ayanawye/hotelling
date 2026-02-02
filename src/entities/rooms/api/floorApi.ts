import { baseApi } from '@shared/api/baseApi';

import type { IHotelFloor } from '../types';

export const floorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelFloors: builder.query<IHotelFloor[], void>({
      query: () => ({
        url: 'hotel/floors/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_FLOOR'],
    }),
    createNewHotelFloor: builder.mutation<void, IHotelFloor>({
      query: (body) => ({
        url: 'hotel/floors/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['HOTEL_FLOOR'],
    }),
    getHotelFloorByID: builder.query<void, number>({
      query: (floorID) => ({
        url: `hotel/floors/${floorID}/`,
        method: 'GET',
      }),
    }),
    patchHotelFloor: builder.mutation<void, IHotelFloor>({
      query: (body) => ({
        url: `hotel/floors/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['HOTEL_FLOOR'],
    }),
    deleteHotelFloor: builder.mutation<void, number>({
      query: (id) => ({
        url: `hotel/floors/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HOTEL_FLOOR'],
    }),
  }),
});

export const {
  useGetHotelFloorsQuery,
  useCreateNewHotelFloorMutation,
  useDeleteHotelFloorMutation,
  useGetHotelFloorByIDQuery,
  usePatchHotelFloorMutation,
} = floorApi;
