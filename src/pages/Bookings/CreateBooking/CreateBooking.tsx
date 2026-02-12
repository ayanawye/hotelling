import { BookingForm } from '@features/BookingForm';
import type { FC } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateBooking: FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    message.success('Бронирование успешно создано');
    navigate('/bookings/list');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: '24px' }}>
      <BookingForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default CreateBooking;
