import { useNavigate } from 'react-router-dom';
import { OrganizationForm } from '@features/OrganizationForm';

const OrganizationCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/organizations/all');
  };

  const handleCancel = () => {
    navigate('/organizations/all');
  };

  return <OrganizationForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default OrganizationCreate;
