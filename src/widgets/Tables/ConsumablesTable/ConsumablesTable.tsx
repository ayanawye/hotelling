import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type IConsumable,
  useDeleteConsumableMutation,
  useGetConsumablesQuery,
} from '@entities/consumable';
import { getErrorMessage } from '@shared/lib';
import { TableActions } from '@widgets/TableActions';

export const ConsumablesTable = () => {
  const navigate = useNavigate();

  const { data } = useGetConsumablesQuery();
  const [deleteConsumable, { isLoading: isDeleteLoading }] =
    useDeleteConsumableMutation();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IConsumable | null>(null);

  const handleDelete = async () => {
    try {
      await deleteConsumable(selectedItem?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IConsumable> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Категория',
      dataIndex: ['category', 'name'],
      key: 'category_name',
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

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={isDeleteLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить расходник?'
        isLoading={isDeleteLoading}
        description={`Расходник "${selectedItem?.name}" будет удален из системы.`}
      />
    </>
  );
};
