import { baseApi } from '@shared/api/baseApi';

import type { IHotelEnclosure } from '../types';

export const enclosureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelEnclosures: builder.query<IHotelEnclosure[], string | void>({
      query: (search) => ({
        url: 'hotel/hulls/',
        method: 'GET',
        params: { search: search },
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
    getHotelEnclosureByID: builder.query<IHotelEnclosure, number>({
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
