import { useNavigate, useParams } from 'react-router-dom';
import { useGetConsumableUsageByIdQuery } from '@entities/consumable';
import { ConsumableUsageForm } from '@features/ConsumableUsageForm';
import { PageLoader } from '@shared/ui';

const ConsumableUsageEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetConsumableUsageByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/consumables/used');
  };

  const handleCancel = () => {
    navigate('/consumables/used');
  };

  if (id && isLoading) {
    return <PageLoader />;
  }

  return (
    <ConsumableUsageForm
      initialValues={data}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default ConsumableUsageEdit;
