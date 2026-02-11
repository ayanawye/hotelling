import { useNavigate, useParams } from 'react-router-dom';
import { useGetHotelRoomsTypeByIDQuery } from '@entities/rooms';
import { RoomTypeForm } from '@features/RoomTypeForm';
import { PageLoader } from '@shared/ui';

const TypesEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: roomType, isLoading } = useGetHotelRoomsTypeByIDQuery(
    Number(id),
    {
      skip: !id,
    },
  );

  const handleSuccess = () => {
    navigate('/rooms/types');
  };

  const handleCancel = () => {
    navigate('/rooms/types');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <RoomTypeForm
      initialValues={roomType as any}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default TypesEdit;
