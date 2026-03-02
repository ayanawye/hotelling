import { useNavigate, useParams } from 'react-router-dom';
import { TaxForm } from '@features/TaxForm';
import { useGetFinanceTaxByIdQuery } from '@entities/finance';
import { PageLoader } from '@shared/ui';

const TaxesEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: tax, isLoading } = useGetFinanceTaxByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/finance/taxes');
  };

  const handleCancel = () => {
    navigate('/finance/taxes');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <TaxForm
        initialValues={tax}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaxesEdit;
