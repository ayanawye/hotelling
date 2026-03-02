import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { ConsumableCategoryForm } from '@features/ConsumableCategoryForm';
import { useGetConsumableCategoryByIdQuery } from '@entities/consumable';

const ConsumableCategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useGetConsumableCategoryByIdQuery(
    Number(id),
    {
      skip: !id,
    },
  );

  const handleSuccess = () => {
    navigate('/consumables/categories');
  };

  const handleCancel = () => {
    navigate('/consumables/categories');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <ConsumableCategoryForm
      initialValues={category}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default ConsumableCategoryEdit;
