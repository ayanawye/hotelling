import React from 'react';
import { useParams } from 'react-router-dom';
import { UpdateWashingForm } from '@features/UpdateWashingForm';

const WashingEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return <UpdateWashingForm id={Number(id)} />;
};

export default WashingEdit;
