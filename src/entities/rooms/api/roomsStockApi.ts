import { baseApi } from '@shared/api/baseApi';

import type { IRoomStock } from '../types';

export const roomsStockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelRoomStocks: builder.query<IRoomStock[], void>({
      query: () => ({
        url: 'hotel/room-stocks/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_ROOM_STOCK'],
    }),
    createHotelRoomStock: builder.mutation<void, IRoomStock>({
      query: (body) => ({
        url: 'hotel/room-stocks/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOM_STOCK'],
    }),
    getHotelRoomStockByID: builder.query<void, number>({
      query: (floorID) => ({
        url: `hotel/room-stocks/${floorID}/`,
        method: 'GET',
      }),
    }),
    patchHotelRoomStock: builder.mutation<void, IRoomStock>({
      query: (body) => ({
        url: `hotel/room-stocks/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOM_STOCK'],
    }),
    deleteHotelRoomStock: builder.mutation<void, number>({
      query: (id) => ({
        url: `hotel/room-stocks/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HOTEL_ROOM_STOCK'],
    }),
  }),
});

export const {
  useGetHotelRoomStocksQuery,
  useGetHotelRoomStockByIDQuery,
  useCreateHotelRoomStockMutation,
  usePatchHotelRoomStockMutation,
  useDeleteHotelRoomStockMutation,
} = roomsStockApi;
