import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { useGetConsumableBreakdownByIdQuery } from '@entities/consumable';
import { ConsumableBreakdownForm } from '@features/ConsumableBreakdownForm';

const ConsumableBreakdownEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetConsumableBreakdownByIdQuery(Number(id), {
    skip: !id,
  });

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
    <ConsumableBreakdownForm
      initialValues={data}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default ConsumableBreakdownEdit;
