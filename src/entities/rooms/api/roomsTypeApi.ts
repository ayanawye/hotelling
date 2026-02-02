import { baseApi } from '@shared/api/baseApi';

import type { IRoomType } from '../types';

export const roomsTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelRoomsTypes: builder.query<IRoomType, void>({
      query: () => ({
        url: 'hotel/room-types/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_ROOMS_TYPE'],
    }),
    createHotelRoomsType: builder.mutation<void, IRoomType>({
      query: (body) => ({
        url: 'hotel/room-types/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOMS_TYPE'],
    }),
    getHotelRoomsTypeByID: builder.query<void, number>({
      query: (floorID) => ({
        url: `hotel/room-types/${floorID}/`,
        method: 'GET',
      }),
    }),
    patchHotelRoomsType: builder.mutation<void, IRoomType>({
      query: (body) => ({
        url: `hotel/room-types/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOMS_TYPE'],
    }),
    deleteHotelRoomsType: builder.mutation<void, number>({
      query: (id) => ({
        url: `hotel/room-types/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HOTEL_ROOMS_TYPE'],
    }),
  }),
});

export const {
  useGetHotelRoomsTypesQuery,
  useGetHotelRoomsTypeByIDQuery,
  useCreateHotelRoomsTypeMutation,
  useDeleteHotelRoomsTypeMutation,
  usePatchHotelRoomsTypeMutation,
} = roomsTypeApi;
