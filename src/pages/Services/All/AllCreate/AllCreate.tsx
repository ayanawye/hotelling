import { useNavigate } from 'react-router-dom';
import { ServiceForm } from '@features/ServiceForm';

const AllCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/services/all');
  };

  const handleCancel = () => {
    navigate('/services/all');
  };

  return <ServiceForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default AllCreate;
