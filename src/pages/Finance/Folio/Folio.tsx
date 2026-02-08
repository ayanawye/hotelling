import { FolioTable } from '@widgets/Tables';
import type { FC } from 'react';
import { useGetFolioTransactionsQuery } from '@entities/finance';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Folio: FC = () => {
  const { isError, isLoading } = useGetFolioTransactionsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки типов оплат' type='error' />;
  }

  return <FolioTable />;
};

export default Folio;
