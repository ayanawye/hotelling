export {
  useGetTariffQuery,
  useGetTariffByIdQuery,
  useCreateTariffMutation,
  useDeleteTariffMutation,
  usePatchTariffMutation,
} from './api/tariff';

export {
  useGetOrganizationTariffsQuery,
  useGetOrganizationTariffByIdQuery,
  useCreateOrganizationTariffMutation,
  usePatchOrganizationTariffMutation,
  useDeleteOrganizationTariffMutation,
} from './api/organizationTariff';

export * from '@entities/finance/types';
