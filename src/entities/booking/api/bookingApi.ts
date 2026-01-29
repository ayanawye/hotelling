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
        url: '/booking/reservation/',
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
  }),
});

export const { useFetchAllBookingsQuery, useCreateBookingMutation } =
  bookingApi;
