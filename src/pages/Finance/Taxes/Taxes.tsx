import { TaxesTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetFinanceTaxesQuery } from '@entities/finance';

const Taxes: FC = () => {
  const { isError, isLoading } = useGetFinanceTaxesQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки налогов' type='error' />;
  }

  return <TaxesTable />;
};

export default Taxes;
