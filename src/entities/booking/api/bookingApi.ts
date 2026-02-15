import { baseApi } from '@shared/api/baseApi';
import type { Room } from '../model/types';
import type { IReservation } from '@shared/types/IBooking';

export type Booking = IReservation;

export type ICreateBookingRequest = {
  guest: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email?: string;
    phone?: string;
  };
  rooms: number[];
  guarantee_type: string;
  arrival_datetime: string;
  departure_datetime: string;
  nights: number;
  adults: number;
  children: number;
  infants: number;
};

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllBookings: build.query<Booking[], void>({
      query: () => ({
        url: '/booking/reservation/',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),
    createBooking: build.mutation<Booking, ICreateBookingRequest>({
      query: (booking) => ({
        url: '/booking/reservation/',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    fetchBookingById: build.query<Booking, number>({
      query: (id) => ({
        url: `/booking/reservation/${id}/`,
      }),
      providesTags: (_, __, id) => [{ type: 'Booking', id }],
    }),
    updateBooking: build.mutation<
      Booking,
      { id: number; body: Partial<ICreateBookingRequest> }
    >({
      query: ({ id, body }) => ({
        url: `/booking/reservation/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Booking', id: 'LIST' },
        { type: 'Booking', id },
      ],
    }),
    deleteBooking: build.mutation<void, number>({
      query: (id) => ({
        url: `/booking/reservation/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Booking', id: 'LIST' },
        { type: 'Booking', id },
      ],
    }),
    fetchRoomStocks: build.query<Room[], void>({
      query: () => ({
        url: '/hotel/room-stocks/',
      }),
      providesTags: ['Room'],
    }),
  }),
});

export const {
  useFetchAllBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useFetchBookingByIdQuery,
  useDeleteBookingMutation,
  useFetchRoomStocksQuery,
} = bookingApi;
