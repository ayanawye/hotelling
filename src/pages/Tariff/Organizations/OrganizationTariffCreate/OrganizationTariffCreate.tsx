import { useNavigate } from 'react-router-dom';
import { OrganizationTariffForm } from '@features/OrganizationTariffForm';

const OrganizationTariffCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/tariff/organizations');
  };

  const handleCancel = () => {
    navigate('/tariff/organizations');
  };

  return (
    <OrganizationTariffForm onSuccess={handleSuccess} onCancel={handleCancel} />
  );
};

export default OrganizationTariffCreate;
