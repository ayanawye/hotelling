import { baseApi } from '@shared/api/baseApi';

import type { IRoomStatus } from '../types';

export const roomsStatus = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelRoomsStatus: builder.query<IRoomStatus[], void>({
      query: () => ({
        url: 'hotel/room-statuses/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_ROOM_STATUS'],
    }),
    createHotelRoomsStatus: builder.mutation<void, IRoomStatus>({
      query: (body) => ({
        url: 'hotel/room-statuses/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOM_STATUS'],
    }),
    getHotelRoomStatusByID: builder.query<IRoomStatus, number>({
      query: (id) => ({
        url: `hotel/room-statuses/${id}/`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'HOTEL_ROOM_STATUS', id }],
    }),
    patchHotelRoomStatus: builder.mutation<void, IRoomStatus>({
      query: (body) => ({
        url: `hotel/room-statuses/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        'HOTEL_ROOM_STATUS',
        { type: 'HOTEL_ROOM_STATUS', id },
      ],
    }),
    deleteHotelRoomStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `hotel/room-statuses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HOTEL_ROOM_STATUS'],
    }),
  }),
});

export const {
  useGetHotelRoomsStatusQuery,
  useGetHotelRoomStatusByIDQuery,
  useCreateHotelRoomsStatusMutation,
  usePatchHotelRoomStatusMutation,
  useDeleteHotelRoomStatusMutation,
} = roomsStatus;
