import { useNavigate } from 'react-router-dom';
import { TaxForm } from '@features/TaxForm';

const TaxesCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/finance/taxes');
  };

  const handleCancel = () => {
    navigate('/finance/taxes');
  };

  return (
    <div>
      <TaxForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default TaxesCreate;
