import { baseApi } from '@shared/api/baseApi';
import type { Room } from '../model/types';

export interface Guest {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
}

export interface Booking {
  id: number;
  hotel: number;
  guest: Guest;
  organization: any | null;
  room: number;
  guarantee_type: string;
  arrival_datetime: string;
  departure_datetime: string;
  nights: number;
  adults: number;
  children: number;
  infants: number;
  status: string;
  group_id: string;
}

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllBookings: build.query<Booking[], void>({
      query: () => ({
        url: '/booking/reservation',
      }),
      providesTags: ['Booking'],
    }),
    createBooking: build.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: '/booking/reservation/',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['Booking'],
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
  useFetchRoomStocksQuery,
} = bookingApi;
