import type { FC } from 'react';
import { GuestsTable } from '@widgets/Tables';
import { useGetGuestsQuery } from '@entities/guests';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Guests: FC = () => {
  const { isError, isLoading } = useGetGuestsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return <GuestsTable />;
};

export default Guests;
