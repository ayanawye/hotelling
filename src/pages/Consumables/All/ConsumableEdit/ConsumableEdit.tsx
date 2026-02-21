import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { useGetConsumableByIdQuery } from '@entities/consumable';
import { ConsumableForm } from '@features/ConsumableForm';

const ConsumableEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetConsumableByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/consumables/all');
  };

  const handleCancel = () => {
    navigate('/consumables/all');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <ConsumableForm
      initialValues={data}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default ConsumableEdit;
