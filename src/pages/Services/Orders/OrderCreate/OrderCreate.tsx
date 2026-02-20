import { useNavigate } from 'react-router-dom';
import { ServiceOrderForm } from '@features/ServiceOrderForm';

const OrderCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/services/orders');
  };

  const handleCancel = () => {
    navigate('/services/orders');
  };

  return <ServiceOrderForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default OrderCreate;
