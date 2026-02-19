import { useNavigate, useParams } from 'react-router-dom';
import { PageLoader } from '@shared/ui';
import { OrganizationTariffForm } from '@features/OrganizationTariffForm';
import { useGetOrganizationTariffByIdQuery } from '@entities/tariff';

const OrganizationTariffEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: organizationTariff, isLoading } =
    useGetOrganizationTariffByIdQuery(Number(id));

  const handleSuccess = () => {
    navigate('/tariff/organizations');
  };

  const handleCancel = () => {
    navigate('/tariff/organizations');
  };

  if (isLoading) return <PageLoader />;

  return (
    <OrganizationTariffForm
      initialValues={organizationTariff}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default OrganizationTariffEdit;
