import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrganizationByIdQuery } from '@entities/organizations';
import { OrganizationForm } from '@features/OrganizationForm';
import { PageLoader } from '@shared/ui';

const OrganizationEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: organizationData, isLoading } = useGetOrganizationByIdQuery(
    Number(id),
  );

  const handleSuccess = () => {
    navigate('/organizations/all');
  };

  const handleCancel = () => {
    navigate('/organizations/all');
  };

  if (isLoading) return <PageLoader />;

  return (
    <OrganizationForm
      initialValues={organizationData}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default OrganizationEdit;
