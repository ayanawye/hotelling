import { useNavigate, useParams } from 'react-router-dom';
import { PaymentTypesForm } from '@features/PaymentTypesForm';
import { useGetFinancePaymentTypeByIdQuery } from '@entities/finance';
import { PageLoader } from '@shared/ui';

const PaymentTypesEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: paymentType, isLoading } = useGetFinancePaymentTypeByIdQuery(
    Number(id),
    {
      skip: !id,
    },
  );

  const handleSuccess = () => {
    navigate('/finance/payment-types');
  };

  const handleCancel = () => {
    navigate('/finance/payment-types');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <PaymentTypesForm
        initialValues={paymentType}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default PaymentTypesEdit;
