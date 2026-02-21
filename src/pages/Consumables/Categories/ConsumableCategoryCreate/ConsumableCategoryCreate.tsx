import { useNavigate } from 'react-router-dom';
import { ConsumableCategoryForm } from '@features/ConsumableCategoryForm';
import { useCreateConsumableCategoryMutation } from '@entities/consumable';

const ConsumableCategoryCreate = () => {
  const navigate = useNavigate();
  const [createItem, { isLoading }] = useCreateConsumableCategoryMutation();

  const handleSuccess = () => {
    navigate('/consumables/categories');
  };

  const handleCancel = () => {
    navigate('/consumables/categories');
  };

  return (
    <ConsumableCategoryForm
      apiFunc={createItem}
      isLoading={isLoading}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default ConsumableCategoryCreate;
