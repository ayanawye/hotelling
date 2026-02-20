import { useNavigate } from 'react-router-dom';
import { ServiceCategoryForm } from '@features/ServiceCategoryForm';

const CategoriesCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/services/categories');
  };

  const handleCancel = () => {
    navigate('/services/categories');
  };

  return (
    <ServiceCategoryForm onSuccess={handleSuccess} onCancel={handleCancel} />
  );
};

export default CategoriesCreate;
