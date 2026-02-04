import { useNavigate } from 'react-router-dom';
import { CurrenciesForm } from '@features/CurrenciesForm';

const CurrenciesCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/finance/currencies');
  };

  const handleCancel = () => {
    navigate('/finance/currencies');
  };

  return (
    <div>
      <CurrenciesForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default CurrenciesCreate;
