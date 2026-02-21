import { ConsumablesTable } from '@widgets/Tables';
import { type FC, useState } from 'react';
import {
  useDeleteConsumableMutation,
  useGetConsumablesQuery,
} from '@entities/consumable';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const All: FC = () => {
  const { data, isError, isLoading } = useGetConsumablesQuery();
  const [deleteConsumable, { isLoading: isDeleteLoading }] =
    useDeleteConsumableMutation();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки' type='error' />;
  }

  return (
    <ConsumablesTable
      deleteConsumable={deleteConsumable}
      isDeleteLoading={isDeleteLoading}
      data={data}
      setFilter={setFilter}
      filter={filter}
    />
  );
};

export default All;
