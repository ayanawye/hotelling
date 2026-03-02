import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { type IConsumableCategory } from '@entities/consumable';
import { getErrorMessage } from '@shared/lib';
import {
  type ILaundryItem,
  useDeleteLaundryItemMutation,
  useGetLaundryItemsQuery,
  usePatchLaundryItemMutation,
} from '@entities/laundry';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';

export const LaundryItemsTable = () => {
  const navigate = useNavigate();

  const { data } = useGetLaundryItemsQuery();
  const [updateItem, { isLoading: isUpdating }] = usePatchLaundryItemMutation();
  const [deleteItem, { isLoading }] = useDeleteLaundryItemMutation();

  const [filter, setFilter] = useState({
    search: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IConsumableCategory | null>(
    null,
  );

  const handleDelete = async () => {
    try {
      await deleteItem(selectedItem?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const handleUpdate = async (record: ILaundryItem, active: boolean) => {
    try {
      await updateItem({
        id: record.id,
        is_active: active,
      }).unwrap();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<ILaundryItem> = [
    {
      title: 'Категория',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Активные',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(active) => handleUpdate(record, active)}
          style={{ backgroundColor: isActive ? '#00B368' : undefined }}
        />
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '220px',
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
      <div style={{ display: 'flex', gap: '16px' }}>
        <InputTextField
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
      </div>
      <div className={'table-header-filter'}>
        <Select
          placeholder='Категория'
          style={{ width: 140, height: 40 }}
          options={[]}
          allowClear
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          <span>Создать</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={isLoading || isUpdating}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить предмет?'
        isLoading={isLoading}
        description={`Предмет "${selectedItem?.name}" будет удален из системы.`}
      />
    </>
  );
};
