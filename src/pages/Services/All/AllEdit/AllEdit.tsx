import { useNavigate, useParams } from 'react-router-dom';
import { ServiceForm } from '@features/ServiceForm';
import { useGetServiceByIdQuery } from '@entities/services';
import { Spin } from 'antd';

const AllEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: service, isLoading } = useGetServiceByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/services/all');
  };

  const handleCancel = () => {
    navigate('/services/all');
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

  return (
    <ServiceForm
      initialValues={service}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default AllEdit;
