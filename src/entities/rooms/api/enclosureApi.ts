import { baseApi } from '@shared/api/baseApi';

import type { IHotelEnclosure } from '../types';

export const enclosureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelEnclosures: builder.query<IHotelEnclosure, void>({
      query: () => ({
        url: 'hotel/hulls/',
        method: 'GET',
      }),
      providesTags: ['HOTEL_ENCLOSURE'],
    }),
    createNewHotelEnclosure: builder.mutation<void, IHotelEnclosure>({
      query: (body) => ({
        url: 'hotel/hulls/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['HOTEL_ENCLOSURE'],
    }),
    getHotelEnclosureByID: builder.query<void, number>({
      query: (floorID) => ({
        url: `hotel/hulls/${floorID}/`,
        method: 'GET',
      }),
    }),
    patchHotelEnclosure: builder.mutation<void, IHotelEnclosure>({
      query: (body) => ({
        url: `hotel/hulls/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['HOTEL_ENCLOSURE'],
    }),
    deleteHotelEnclosure: builder.mutation<void, number>({
      query: (id) => ({
        url: `hotel/hulls/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HOTEL_ENCLOSURE'],
    }),
  }),
});

export const {
  useCreateNewHotelEnclosureMutation,
  useDeleteHotelEnclosureMutation,
  useGetHotelEnclosureByIDQuery,
  useGetHotelEnclosuresQuery,
  usePatchHotelEnclosureMutation,
} = enclosureApi;
