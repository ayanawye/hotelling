import { useNavigate, useParams } from 'react-router-dom';
import { ServiceCategoryForm } from '@features/ServiceCategoryForm';
import { useGetServiceCategoryByIdQuery } from '@entities/services';
import { Spin } from 'antd';

const CategoriesEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useGetServiceCategoryByIdQuery(
    Number(id),
    {
      skip: !id,
    },
  );

  const handleSuccess = () => {
    navigate('/services/categories');
  };

  const handleCancel = () => {
    navigate('/services/categories');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <ServiceCategoryForm
      initialValues={category}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default CategoriesEdit;
