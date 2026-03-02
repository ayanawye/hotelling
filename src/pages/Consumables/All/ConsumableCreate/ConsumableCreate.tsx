import { useNavigate } from 'react-router-dom';
import { ConsumableForm } from '@features/ConsumableForm';

const ConsumableCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/consumables/all');
  };

  const handleCancel = () => {
    navigate('/consumables/all');
  };

  return <ConsumableForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default ConsumableCreate;
