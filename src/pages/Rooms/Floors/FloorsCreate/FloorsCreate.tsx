import { RoomsForm } from '@features/RoomsForm';
import { useNavigate } from 'react-router-dom';

const FloorsCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/rooms/floors');
  };

  const handleCancel = () => {
    navigate('/rooms/floors');
  };

  return <RoomsForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default FloorsCreate;
