export * from '@entities/organizations/types';
export {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  usePatchOrganizationMutation,
  useDeleteOrganizationMutation,
} from './api/organizationsApi';
export {
  useGetOrganizationTypesQuery,
  useGetOrganizationTypeByIdQuery,
  useCreateOrganizationTypeMutation,
  usePatchOrganizationTypeMutation,
  useDeleteOrganizationTypeMutation,
} from './api/organizationTypesApi';
