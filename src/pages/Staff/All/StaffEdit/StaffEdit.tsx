import { useNavigate, useParams } from 'react-router-dom';
import { StaffForm } from '@features/StaffForm';
import { useGetStaffByIdQuery } from '@entities/staff';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const StaffEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetStaffByIdQuery(Number(id), {
    skip: !id,
  });

  const handleSuccess = () => {
    navigate('/staff/all');
  };

  const handleCancel = () => {
    navigate('/staff/all');
  };

  if (isLoading) return <PageLoader />;
  if (isError)
    return <Alert message='Ошибка загрузки данных сотрудника' type='error' />;

  return (
    <StaffForm
      initialValues={data}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default StaffEdit;
