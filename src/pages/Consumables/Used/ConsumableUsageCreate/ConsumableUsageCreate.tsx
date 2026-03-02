import { useNavigate } from 'react-router-dom';
import { ConsumableUsageForm } from '@features/ConsumableUsageForm';

const ConsumableUsageCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/consumables/used');
  };

  const handleCancel = () => {
    navigate('/consumables/used');
  };

  return (
    <ConsumableUsageForm onSuccess={handleSuccess} onCancel={handleCancel} />
  );
};

export default ConsumableUsageCreate;
