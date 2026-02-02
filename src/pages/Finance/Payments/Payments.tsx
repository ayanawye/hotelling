import { PaymentsTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetPaymentsQuery } from '@entities/finance';

const Payments: FC = () => {
  const { isError, isLoading } = useGetPaymentsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки типов оплат' type='error' />;
  }
  return <PaymentsTable />;
};

export default Payments;
