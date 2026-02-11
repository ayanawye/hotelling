import { useNavigate } from 'react-router-dom';
import { RoomTypeForm } from '@features/RoomTypeForm';

const TypesCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/rooms/types');
  };

  const handleCancel = () => {
    navigate('/rooms/types');
  };

  return <RoomTypeForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default TypesCreate;
