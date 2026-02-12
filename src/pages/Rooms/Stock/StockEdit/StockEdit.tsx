import { useNavigate, useParams } from 'react-router-dom';
import { useGetHotelRoomStockByIDQuery } from '@entities/rooms';
import { RoomStockForm } from '@features/RoomStockForm';
import { PageLoader } from '@shared/ui';

const StockEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: stockData, isLoading } = useGetHotelRoomStockByIDQuery(
    Number(id),
  );

  const handleSuccess = () => {
    navigate('/rooms/stock');
  };

  const handleCancel = () => {
    navigate('/rooms/stock');
  };

  if (isLoading) return <PageLoader />;

  return (
    <RoomStockForm
      initialValues={stockData}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default StockEdit;
