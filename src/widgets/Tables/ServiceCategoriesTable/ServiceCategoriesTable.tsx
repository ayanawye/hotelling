import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  useDeleteServiceCategoryMutation,
  useGetServiceCategoriesQuery,
} from '@entities/services';
import type { IServiceCategory } from '@entities/services/types';
import { getErrorMessage } from '@shared/lib';
import { useNavigate } from 'react-router-dom';
import { TableActions } from '@widgets/TableActions';

export const ServiceCategoriesTable = () => {
  const navigate = useNavigate();

  const { data } = useGetServiceCategoriesQuery();
  const [deleteServiceCategory, { isLoading }] =
    useDeleteServiceCategoryMutation();

  const [filter, setFilter] = useState({
    search: '',
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<IServiceCategory | null>(null);

  const handleDelete = async () => {
    try {
      await deleteServiceCategory(selectedCategory?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IServiceCategory> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Активна',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => <Switch checked={isActive} />,
    },
    {
      title: 'Порядок сортировки',
      dataIndex: 'sort_order',
      key: 'sort_order',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          setSelectedItem={setSelectedCategory}
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
        description={`Категория "${selectedCategory?.name}" будет удален из системы.`}
      />
    </>
  );
};
