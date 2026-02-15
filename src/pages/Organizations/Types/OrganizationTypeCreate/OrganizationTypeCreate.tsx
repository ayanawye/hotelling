import { useNavigate } from 'react-router-dom';
import { OrganizationTypeForm } from '@features/OrganizationTypeForm';

const OrganizationTypeCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/organizations/types');
  };

  const handleCancel = () => {
    navigate('/organizations/types');
  };

  return (
    <OrganizationTypeForm onSuccess={handleSuccess} onCancel={handleCancel} />
  );
};

export default OrganizationTypeCreate;
