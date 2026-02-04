import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { EnclosureForm } from '@features/EnclosureForm';
import { useGetHotelEnclosureByIDQuery } from '@entities/rooms';

const EnclosuresEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: enclosure, isLoading } = useGetHotelEnclosureByIDQuery(
    Number(id),
    {
      skip: !id,
    },
  );

  const handleSuccess = () => {
    navigate('/rooms/enclosures');
  };

  const handleCancel = () => {
    navigate('/rooms/enclosures');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <div>
      <EnclosureForm
        initialValues={enclosure}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EnclosuresEdit;
