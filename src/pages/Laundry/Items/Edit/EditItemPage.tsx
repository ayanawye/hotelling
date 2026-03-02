import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetLaundryItemByIdQuery } from '@entities/laundry';
import { LaundryItemForm } from '@features/LaundryItemForm';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const EditItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: item,
    isLoading,
    isError,
  } = useGetLaundryItemByIdQuery(Number(id), {
    skip: !id,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !item) {
    return <Alert message='Ошибка при загрузке предмета' type='error' />;
  }

  return (
    <div>
      <LaundryItemForm initialValues={item} />
    </div>
  );
};

export default EditItemPage;
