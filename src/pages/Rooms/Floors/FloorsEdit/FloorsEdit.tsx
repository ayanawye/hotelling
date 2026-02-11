import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetHotelEnclosuresQuery,
  useGetHotelFloorByIDQuery,
} from '@entities/rooms';
import { RoomsForm } from '@features/RoomsForm';
import { PageLoader } from '@shared/ui';

const FloorsEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: floor, isLoading } = useGetHotelFloorByIDQuery(Number(id), {
    skip: !id,
  });
  const { isLoading: isEnclosures } = useGetHotelEnclosuresQuery();

  const handleSuccess = () => {
    navigate('/rooms/floors');
  };

  const handleCancel = () => {
    navigate('/rooms/floors');
  };

  if (isLoading || isEnclosures) {
    return <PageLoader />;
  }

  return (
    <RoomsForm
      initialValues={floor}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default FloorsEdit;
