import { useNavigate } from 'react-router-dom';
import { RoomStockForm } from '@features/RoomStockForm';

const StockCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/rooms/stock');
  };

  const handleCancel = () => {
    navigate('/rooms/stock');
  };

  return <RoomStockForm onSuccess={handleSuccess} onCancel={handleCancel} />;
};

export default StockCreate;
