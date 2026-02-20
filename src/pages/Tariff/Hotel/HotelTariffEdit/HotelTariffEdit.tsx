import { useNavigate, useParams } from 'react-router-dom';
import { HotelTariffForm } from '@features/HotelTariffForm';
import { useGetTariffByIdQuery } from '@entities/tariff';
import { PageLoader } from '@shared/ui';

const HotelTariffEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: tariff, isLoading } = useGetTariffByIdQuery(Number(id));

  const handleSuccess = () => {
    navigate('/tariff/hotel');
  };

  const handleCancel = () => {
    navigate('/tariff/hotel');
  };

  if (isLoading) return <PageLoader />;

  return (
    <HotelTariffForm
      initialValues={tariff}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default HotelTariffEdit;
