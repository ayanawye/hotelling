import { useNavigate } from 'react-router-dom';
import { RoomStatusForm } from '@features/RoomStatusForm';

const StatusCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/rooms/status');
  };

  const handleCancel = () => {
    navigate('/rooms/status');
  };

  return <RoomStatusForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default StatusCreate;
