import { useNavigate } from 'react-router-dom';
import { ConsumableBreakdownForm } from '@features/ConsumableBreakdownForm';

const ConsumableBreakdownCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/consumables/breakdowns');
  };

  const handleCancel = () => {
    navigate('/consumables/breakdowns');
  };

  return (
    <ConsumableBreakdownForm
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default ConsumableBreakdownCreate;
