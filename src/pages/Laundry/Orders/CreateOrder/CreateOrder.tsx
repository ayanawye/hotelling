import { LaundryOrderForm } from '@features/LaundryOrderForm';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

const CreateOrder: FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/laundry/orders');
  };

  const handleCancel = () => {
    navigate('/laundry/orders');
  };

  return <LaundryOrderForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default CreateOrder;
