import { useNavigate } from 'react-router-dom';
import { PaymentTypesForm } from '@features/PaymentTypesForm';

const PaymentTypesCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/finance/payment-types');
  };

  const handleCancel = () => {
    navigate('/finance/payment-types');
  };

  return (
    <div>
      <PaymentTypesForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default PaymentTypesCreate;
