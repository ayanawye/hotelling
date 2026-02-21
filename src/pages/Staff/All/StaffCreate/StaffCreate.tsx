import { useNavigate } from 'react-router-dom';
import { StaffForm } from '@features/StaffForm';

const StaffCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/staff/all');
  };

  const handleCancel = () => {
    navigate('/staff/all');
  };

  return <StaffForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default StaffCreate;
