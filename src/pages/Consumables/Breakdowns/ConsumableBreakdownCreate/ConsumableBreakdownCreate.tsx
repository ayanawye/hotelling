import { useNavigate } from 'react-router-dom';
import { useCreateConsumableBreakdownMutation } from '@entities/consumable';
import { ConsumableCategoryForm } from '@features/ConsumableCategoryForm';

const ConsumableBreakdownCreate = () => {
  const navigate = useNavigate();

  const [patchItem, { isLoading }] = useCreateConsumableBreakdownMutation();

  const handleSuccess = () => {
    navigate('/consumables/breakdowns');
  };

  const handleCancel = () => {
    navigate('/consumables/breakdowns');
  };

  return (
    <ConsumableCategoryForm
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      isLoading={isLoading}
      apiFunc={patchItem}
    />
  );
};

export default ConsumableBreakdownCreate;
