import { baseApi } from '@shared/api/baseApi';
import { type IOrganization } from '@entities/organizations/types';

export const organizationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<IOrganization[], void>({
      query: () => ({
        url: 'organizations/organizations/',
        method: 'GET',
      }),
      providesTags: ['ORGANIZATION'],
    }),
    getOrganizationById: builder.query<IOrganization, number>({
      query: (id) => ({
        url: `organizations/organizations/${id}/`,
        method: 'GET',
      }),
    }),
    createOrganization: builder.mutation<void, Partial<IOrganization>>({
      query: (body) => ({
        url: 'organizations/organizations/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ORGANIZATION'],
    }),
    patchOrganization: builder.mutation<
      void,
      { id: number; body: Partial<IOrganization> }
    >({
      query: ({ id, body }) => ({
        url: `organizations/organizations/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        'ORGANIZATION',
        { type: 'ORGANIZATION', id },
      ],
    }),
    deleteOrganization: builder.mutation<void, number>({
      query: (id) => ({
        url: `organizations/organizations/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ORGANIZATION'],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  usePatchOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationsApi;
