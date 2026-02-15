import { baseApi } from '@shared/api/baseApi';
import { type IOrganizationType } from '@entities/organizations/types';

export const organizationTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationTypes: builder.query<IOrganizationType[], void>({
      query: () => ({
        url: 'organizations/organization-types/',
        method: 'GET',
      }),
      providesTags: ['ORGANIZATION_TYPE'],
    }),
    getOrganizationTypeById: builder.query<IOrganizationType, number>({
      query: (id) => ({
        url: `organizations/organization-types/${id}/`,
        method: 'GET',
      }),
    }),
    createOrganizationType: builder.mutation<void, Partial<IOrganizationType>>({
      query: (body) => ({
        url: 'organizations/organization-types/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ORGANIZATION_TYPE'],
    }),
    patchOrganizationType: builder.mutation<
      void,
      { id: number; body: Partial<any> | null }
    >({
      query: ({ id, body }) => ({
        url: `organizations/organization-types/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        'ORGANIZATION_TYPE',
        { type: 'ORGANIZATION_TYPE', id },
      ],
    }),
    deleteOrganizationType: builder.mutation<void, number>({
      query: (id) => ({
        url: `organizations/organization-types/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ORGANIZATION_TYPE'],
    }),
  }),
});

export const {
  useGetOrganizationTypesQuery,
  useGetOrganizationTypeByIdQuery,
  useCreateOrganizationTypeMutation,
  usePatchOrganizationTypeMutation,
  useDeleteOrganizationTypeMutation,
} = organizationTypesApi;
