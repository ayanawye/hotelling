import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { ConsumableCategoryForm } from '@features/ConsumableCategoryForm';
import {
  useGetConsumableCategoriesQuery,
  usePatchConsumableCategoryMutation,
} from '@entities/consumable';

const ConsumableCategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useGetConsumableCategoriesQuery(
    Number(id),
    {
      skip: !id,
    },
  );
  const [patchItem, { isLoading: isUpdating }] =
    usePatchConsumableCategoryMutation();

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
      apiFunc={patchItem}
      isLoading={isUpdating}
    />
  );
};

export default ConsumableCategoryEdit;
