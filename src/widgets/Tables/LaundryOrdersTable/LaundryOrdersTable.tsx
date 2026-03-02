import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type ILaundryOrder,
  useDeleteLaundryOrderMutation,
  useGetLaundryOrdersQuery,
} from '@entities/laundry';
import { TableActions } from '@widgets/TableActions';
import dayjs from 'dayjs';

export const LaundryOrdersTable = () => {
  const navigate = useNavigate();
  const { data } = useGetLaundryOrdersQuery();
  const [deleteOrder, { isLoading }] = useDeleteLaundryOrderMutation();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ILaundryOrder | null>(null);

  const handleDelete = async () => {
    try {
      await deleteOrder(Number(selectedItem?.id) || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error('Удаление невозможно');
    }
  };

  const columns: ColumnsType<ILaundryOrder> = [
    {
      title: 'Гость',
      dataIndex: ['guest', 'name'],
      key: 'guest',
      width: '200px',
    },
    {
      title: 'Клининг персонал',
      dataIndex: ['laundry_personal', 'full_name'],
      key: 'staff',
      width: '200px',
    },
    {
      title: 'Предмет',
      dataIndex: 'items',
      key: 'item',
      width: '150px',
    },
    {
      title: 'Статус',
      dataIndex: 'status_label',
      key: 'status',
      width: '100px',
      render: (status) => <Tag>{status}</Tag>,
    },
    {
      title: 'Длительность',
      dataIndex: 'duration_seconds',
      key: 'duration',
      width: '150px',
    },
    {
      title: 'Время выдачи',
      dataIndex: 'planned_pickup_time',
      key: 'duration',
      width: '150px',
      render: (duration) =>
        duration ? dayjs(duration, 'HH:mm:ss').format('HH:mm') : '-',
    },
    {
      title: 'Действие',
      key: 'action',
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
      <div className='table-header-filter'>
        <Select
          placeholder='Категория'
          style={{ width: 140, height: 40 }}
          options={[{ value: 'category1', label: 'Категория 1' }]}
          onChange={(value) => setFilter({ ...filter, category: value })}
          allowClear
          className='custom-select-rounded'
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
        title='Удалить заказ?'
        isLoading={isLoading}
        description={`Заказ клиента"${selectedItem?.guest}" будет удален из системы.`}
      />
    </>
  );
};
