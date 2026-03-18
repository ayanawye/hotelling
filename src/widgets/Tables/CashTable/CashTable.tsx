import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, message, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@shared/lib';
import { TableActions } from '@widgets/TableActions';
import {
  type ICash,
  type ICashCurrency,
  useDeleteCashMutation,
  useGetAllCashesQuery,
  usePatchCashMutation,
} from '@entities/cash';

export const CashTable = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllCashesQuery();
  const [deleteItem, { isLoading: isDeleteLoading }] = useDeleteCashMutation();
  const [updateItem, { isLoading: isUpdateLoading }] = usePatchCashMutation();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ICash | null>(null);

  const handleDelete = async () => {
    try {
      await deleteItem(selectedItem?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<ICash> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => (desc ? desc : '-'),
    },
    {
      title: 'Активна',
      dataIndex: 'is_active',
      key: 'is_active',
      className: 'noWrapColumn',
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={(value) => updateItem({ id: record.id, is_active: value })}
        />
      ),
    },
    {
      title: 'Валюта',
      dataIndex: ['allowed_currencies'],
      key: 'currencies',
      render: (value) => value.map((el: ICashCurrency) => el.code).join(', '),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          setSelectedItem={setSelectedItem}
          record={record}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      ),
    },
  ];

  const TableHeader = (
    <div className='table-header'>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <div className='table-header-filter'>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[]}
          onChange={(value) => setFilter({ ...filter, category: value })}
          allowClear
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          <span>Создать</span>
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={isDeleteLoading || isUpdateLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить кассу?'
        isLoading={isDeleteLoading}
        description={`Касса "${selectedItem?.name}" будет удалена из системы.`}
      />
    </>
  );
};
