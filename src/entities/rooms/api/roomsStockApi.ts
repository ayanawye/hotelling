import { baseApi } from '@shared/api/baseApi';

import type { IRoomStock } from '../types';

export const roomsStockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelRoomStocks: builder.query<
      IRoomStock[],
      {
        search?: string;
        enclosure?: string;
        floor?: string;
        roomType?: string;
      } | void
    >({
      query: (params) => ({
        url: 'hotel/room-stocks/',
        method: 'GET',
        params: params ?? {},
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
    getHotelRoomStockByID: builder.query<IRoomStock, number>({
      query: (id) => ({
        url: `hotel/room-stocks/${id}/`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'HOTEL_ROOM_STOCK', id }],
    }),
    patchHotelRoomStock: builder.mutation<void, IRoomStock>({
      query: (body) => ({
        url: `hotel/room-stocks/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        'HOTEL_ROOM_STOCK',
        { type: 'HOTEL_ROOM_STOCK', id },
      ],
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
