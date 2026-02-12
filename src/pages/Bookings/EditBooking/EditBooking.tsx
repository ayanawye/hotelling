import { BookingForm } from '@features/BookingForm';
import type { FC } from 'react';
import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBookingByIdQuery } from '@entities/booking/api/bookingApi.ts';

const EditBooking: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading } = useFetchBookingByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    message.success('Бронирование успешно обновлено');
    navigate('/bookings/list');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: '50px',
        }}
      >
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <BookingForm
        initialData={booking}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditBooking;
