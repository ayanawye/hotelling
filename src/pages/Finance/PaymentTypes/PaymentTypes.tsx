import { PaymentTypesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetFinancePaymentTypesQuery } from '@entities/finance';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const PaymentTypes: FC = () => {
  const { isError, isLoading } = useGetFinancePaymentTypesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки типов оплат' type='error' />;
  }

  return <PaymentTypesTable />;
};

export default PaymentTypes;
