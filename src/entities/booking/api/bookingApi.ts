import { baseApi } from '@shared/api/baseApi';

export interface Booking {
  id: string;
  roomNumber: string;
  guestName: string;
  startDate: string;
  endDate: string;
}

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllBookings: build.query<Booking[], void>({
      query: () => ({
        url: '/bookings',
      }),
      providesTags: ['Booking'],
    }),
    createBooking: build.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: '/bookings',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const { useFetchAllBookingsQuery, useCreateBookingMutation } =
  bookingApi;
