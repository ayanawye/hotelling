import { CurrenciesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetFinanceCurrenciesQuery } from '@entities/finance';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Currencies: FC = () => {
  const { isError, isLoading } = useGetFinanceCurrenciesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки налогов' type='error' />;
  }

  return <CurrenciesTable />;
};

export default Currencies;
