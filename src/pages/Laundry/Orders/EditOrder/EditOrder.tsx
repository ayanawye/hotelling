import { LaundryOrderForm } from '@features/LaundryOrderForm';
import { useGetLaundryOrderByIdQuery } from '@entities/laundry';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import type { FC } from 'react';

const EditOrder: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useGetLaundryOrderByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/laundry/orders');
  };

  const handleCancel = () => {
    navigate('/laundry/orders');
  };

  if (isLoading) {
    return (
      <Spin size='large' style={{ display: 'block', margin: '100px auto' }} />
    );
  }

  return (
    <LaundryOrderForm
      initialValues={order}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default EditOrder;
