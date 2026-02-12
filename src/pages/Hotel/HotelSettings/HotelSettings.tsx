import { HotelGeneralSettingsForm } from '@features/HotelGeneralSettingsForm';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';
import { useGetHotelSettingsQuery } from '@entities/hotel';

const HotelSettings = () => {
  const { isError, isLoading } = useGetHotelSettingsQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки настройки отели' type='error' />;
  }
  return <HotelGeneralSettingsForm />;
};

export default HotelSettings;
