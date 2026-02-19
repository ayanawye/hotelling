import { baseApi } from '@shared/api/baseApi';

import type { IOrganizationTariff } from '@entities/tariff/types';

export const organizationTariff = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationTariffs: builder.query<IOrganizationTariff[], void>({
      query: () => ({
        url: 'tariff/organization_tariff/',
        method: 'GET',
      }),
      providesTags: ['ORGANIZATION_TARIFF'],
    }),
    createOrganizationTariff: builder.mutation<void, IOrganizationTariff>({
      query: (body) => ({
        url: 'tariff/organization_tariff/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ORGANIZATION_TARIFF'],
    }),
    getOrganizationTariffById: builder.query<IOrganizationTariff, number>({
      query: (id) => ({
        url: `tariff/organization_tariff/${id}/`,
        method: 'GET',
      }),
      providesTags: ['ORGANIZATION_TARIFF'],
    }),
    patchOrganizationTariff: builder.mutation<
      void,
      { id: number | undefined; body: Partial<any> | null }
    >({
      query: ({ id, body }) => ({
        url: `tariff/organization_tariff/${id}/`,
        method: 'PATCH',
        body: { ...body },
      }),
      invalidatesTags: ['ORGANIZATION_TARIFF'],
    }),
    deleteOrganizationTariff: builder.mutation<void, number>({
      query: (id) => ({
        url: `tariff/organization_tariff/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ORGANIZATION_TARIFF'],
    }),
  }),
});

export const {
  useGetOrganizationTariffsQuery,
  useGetOrganizationTariffByIdQuery,
  useCreateOrganizationTariffMutation,
  usePatchOrganizationTariffMutation,
  useDeleteOrganizationTariffMutation,
} = organizationTariff;
