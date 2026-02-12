import { useNavigate, useParams } from 'react-router-dom';
import { useGetHotelRoomStatusByIDQuery } from '@entities/rooms';
import { RoomStatusForm } from '@features/RoomStatusForm';
import { PageLoader } from '@shared/ui';

const StatusEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: statusData, isLoading } = useGetHotelRoomStatusByIDQuery(
    Number(id),
  );

  const handleSuccess = () => {
    navigate('/rooms/status');
  };

  const handleCancel = () => {
    navigate('/rooms/status');
  };

  if (isLoading) return <PageLoader />;

  return (
    <RoomStatusForm
      initialValues={statusData}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default StatusEdit;
