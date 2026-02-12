import { BookingForm } from '@features/BookingForm';
import type { FC } from 'react';

const CreateBooking: FC = () => {
  const handleFinish = (values: any) => {
    console.log('Success:', values);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div style={{ padding: '24px' }}>
      <BookingForm onFinish={handleFinish} onCancel={handleCancel} />
    </div>
  );
};

export default CreateBooking;
