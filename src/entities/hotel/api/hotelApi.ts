import { baseApi } from '@shared/api/baseApi';
import { type IHotelSettings } from '../types';

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelSettings: builder.query<IHotelSettings, void>({
      query: () => ({
        url: 'hotel/hotel/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_SETTINGS'],
    }),
    updateHotelSettings: builder.mutation<void, Partial<IHotelSettings>>({
      query: (body) => ({
        url: 'hotel/hotel/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['HOTEL_SETTINGS'],
    }),
  }),
});

export const { useGetHotelSettingsQuery, useUpdateHotelSettingsMutation } =
  hotelApi;
