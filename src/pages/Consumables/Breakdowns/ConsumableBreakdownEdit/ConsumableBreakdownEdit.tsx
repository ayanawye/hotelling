import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import {
  useGetConsumableBreakdownByIdQuery,
  usePatchConsumableBreakdownMutation,
} from '@entities/consumable';
import { ConsumableCategoryForm } from '@features/ConsumableCategoryForm';

const ConsumableBreakdownEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetConsumableBreakdownByIdQuery(Number(id), {
    skip: !id,
  });
  const [patchItem, { isLoading: isUpdating }] =
    usePatchConsumableBreakdownMutation();

  const handleSuccess = () => {
    navigate('/consumables/breakdowns');
  };

  const handleCancel = () => {
    navigate('/consumables/breakdowns');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <ConsumableCategoryForm
      initialValues={data}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      isLoading={isUpdating}
      apiFunc={patchItem}
    />
  );
};

export default ConsumableBreakdownEdit;
