import React from 'react';
import { CreateWashingForm } from '@features/CreateWashingForm';
import {
  useGetCleaningWorkersQuery,
  useGetLaundryItemsQuery,
} from '@entities/laundry';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const CreateWashingPage: React.FC = () => {
  const { isLoading: isItemsLoading, isError } =
    useGetLaundryItemsQuery('laundry');
  const { isLoading: isStaffLoading, isError: error } =
    useGetCleaningWorkersQuery();

  if (isItemsLoading || isStaffLoading) {
    return <PageLoader />;
  }

  if (isError || error) {
    return <Alert title='Ошибка загрузки ...' type='error' />;
  }

  return <CreateWashingForm />;
};

export default CreateWashingPage;
