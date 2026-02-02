import { baseApi } from '@shared/api/baseApi';

import type { IRoomStock } from '../types';

export const roomsStockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelRoomStocks: builder.query<IRoomStock, void>({
      query: () => ({
        url: 'hotel/floors/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_ROOM_STOCK'],
    }),
    createHotelRoomStock: builder.mutation<void, IRoomStock>({
      query: (body) => ({
        url: 'hotel/floors/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOM_STOCK'],
    }),
    getHotelRoomStockByID: builder.query<void, number>({
      query: (floorID) => ({
        url: `hotel/floors/${floorID}/`,
        method: 'GET',
      }),
    }),
    patchHotelRoomStock: builder.mutation<void, IRoomStock>({
      query: (body) => ({
        url: `hotel/floors/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['HOTEL_ROOM_STOCK'],
    }),
    deleteHotelRoomStock: builder.mutation<void, number>({
      query: (id) => ({
        url: `hotel/floors/${id}/`,
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
