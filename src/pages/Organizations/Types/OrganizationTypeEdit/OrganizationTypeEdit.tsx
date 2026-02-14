import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrganizationTypeByIdQuery } from '@entities/organizations';
import { PageLoader } from '@shared/ui';
import { OrganizationTypeForm } from '@features/OrganizationTypeForm';

const OrganizationTypeEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: organizationTypeData, isLoading } =
    useGetOrganizationTypeByIdQuery(Number(id));

  const handleSuccess = () => {
    navigate('/organizations/types');
  };

  const handleCancel = () => {
    navigate('/organizations/types');
  };

  if (isLoading) return <PageLoader />;

  return (
    <OrganizationTypeForm
      initialValues={organizationTypeData}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default OrganizationTypeEdit;
