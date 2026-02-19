import { useNavigate } from 'react-router-dom';
import { HotelTariffForm } from '@features/HotelTariffForm';

const HotelTariffCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/tariff/hotel');
  };

  const handleCancel = () => {
    navigate('/tariff/hotel');
  };

  return <HotelTariffForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default HotelTariffCreate;
