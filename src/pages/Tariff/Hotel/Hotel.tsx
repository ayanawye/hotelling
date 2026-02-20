import { HotelTariffTable } from '@widgets/Tables';
import type { FC } from 'react';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetTariffQuery } from '@entities/tariff';

const Hotel: FC = () => {
  const { isError, isLoading } = useGetTariffQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки тарифов' type='error' />;
  }

  return <HotelTariffTable />;
};

export default Hotel;
