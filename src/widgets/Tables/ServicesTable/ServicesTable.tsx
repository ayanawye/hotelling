import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from '@entities/services';
import { getErrorMessage } from '@shared/lib';
import { TableActions } from '@widgets/TableActions';
import type { IService } from '@entities/services/types';

export const ServicesTable = () => {
  const navigate = useNavigate();

  const { data } = useGetServicesQuery();
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const handleDelete = async () => {
    try {
      await deleteService(selectedService?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IService> = [
    {
      title: 'Категория',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'category_name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Активна',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => <Switch checked={isActive} disabled />,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          setSelectedItem={setSelectedService}
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
          options={[{ value: 'select', label: 'Select' }]}
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
        loading={isLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить услугу?'
        isLoading={isLoading}
        description={`Услуга "${selectedService?.name}" будет удалена из системы.`}
      />
    </>
  );
};
