import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IConsumableCategory,
  useDeleteConsumableCategoryMutation,
  useGetConsumableCategoriesQuery,
} from '@entities/consumable';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@shared/lib';
import { TableActions } from '@widgets/TableActions';

export const ConsumableCategoriesTable = () => {
  const navigate = useNavigate();

  const { data } = useGetConsumableCategoriesQuery();
  const [deleteConsumableCategory, { isLoading }] =
    useDeleteConsumableCategoryMutation();

  const [filter, setFilter] = useState({
    search: '',
    parentCategory: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IConsumableCategory | null>(
    null,
  );

  const handleDelete = async () => {
    try {
      await deleteConsumableCategory(selectedItem?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IConsumableCategory> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Старшая категория',
      dataIndex: ['sub_category', 'name'],
      key: 'sub_category',
      render: (subCategory) => subCategory || '-',
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
      <div style={{ display: 'flex', gap: '16px' }}>
        <InputTextField
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
      </div>
      <div className='table-header-filter'>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
          onChange={(value) => setFilter({ ...filter, parentCategory: value })}
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
        loading={isLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить категорию?'
        isLoading={isLoading}
        description={`Категория "${selectedItem?.name}" будет удален из системы.`}
      />
    </>
  );
};
