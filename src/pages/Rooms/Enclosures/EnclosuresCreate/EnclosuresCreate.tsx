import { EnclosureForm } from '@features/EnclosureForm';
import { useNavigate } from 'react-router-dom';

const EnclosuresCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/rooms/enclosures');
  };

  const handleCancel = () => {
    navigate('/rooms/enclosures');
  };

  return (
    <div>
      <EnclosureForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default EnclosuresCreate;
