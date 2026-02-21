import { type FC, useState } from 'react';
import { ConsumablesTable } from '@widgets/Tables';
import {
  useDeleteConsumableBreakdownMutation,
  useGetConsumableBreakdownsQuery,
} from '@entities/consumable';
import { PageLoader } from '@shared/ui';
import { Alert } from 'antd';

const Breakdowns: FC = () => {
  const { data, isError, isLoading } = useGetConsumableBreakdownsQuery();
  const [deleteConsumable, { isLoading: isDeleteLoading }] =
    useDeleteConsumableBreakdownMutation();

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

export default Breakdowns;
