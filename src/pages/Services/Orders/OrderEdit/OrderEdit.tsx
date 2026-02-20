import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { useGetServiceOrderByIdQuery } from '@entities/services';
import { ServiceOrderForm } from '@features/ServiceOrderForm';

const OrderEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useGetServiceOrderByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/services/orders');
  };

  const handleCancel = () => {
    navigate('/services/orders');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <ServiceOrderForm
      initialValues={orders}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default OrderEdit;
