import { useNavigate } from 'react-router-dom';
import { ConsumableCategoryForm } from '@features/ConsumableCategoryForm';

const ConsumableCategoryCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/consumables/categories');
  };

  const handleCancel = () => {
    navigate('/consumables/categories');
  };

  return (
    <ConsumableCategoryForm onSuccess={handleSuccess} onCancel={handleCancel} />
  );
};

export default ConsumableCategoryCreate;
