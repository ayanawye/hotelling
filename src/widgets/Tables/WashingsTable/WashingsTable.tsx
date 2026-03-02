import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';
import {
  type IWashing,
  useDeleteWashingMutation,
  useGetAllWashingsQuery,
} from '@entities/laundry';

export const WashingsTable = () => {
  const navigate = useNavigate();
  const { data } = useGetAllWashingsQuery();
  const [deleteWashing, { isLoading }] = useDeleteWashingMutation();

  const [filter, setFilter] = useState({
    search: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWashing, setSelectedWashing] = useState<IWashing | null>(null);

  const handleDelete = async () => {
    try {
      await deleteWashing(Number(selectedWashing?.id) || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error('Удаление невозможно');
    }
  };

  const columns: ColumnsType<IWashing> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '80px',
    },
    {
      title: 'Персонал',
      dataIndex: ['laundry_personal', 'full_name'],
      key: 'laundry_personal',
    },
    {
      title: 'Предмет',
      dataIndex: 'items',
      key: 'items',
      render: (items) => <p>{items.length ? items[0]?.item.name : ''}</p>,
    },
    {
      title: 'Статус',
      dataIndex: 'status_label',
      key: 'status',
      render: (status) => <Tag>{status}</Tag>,
    },
    {
      title: 'Длительность',
      dataIndex: 'duration_seconds',
      key: 'duration',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '220px',
      render: (_, record) => (
        <TableActions
          record={record}
          setDeleteModalOpen={setDeleteModalOpen}
          setSelectedItem={setSelectedWashing}
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
        {/*<FilterRooms />*/}
        <p>filter</p>
        <Button variant='primary' onClick={() => navigate('create')}>
          Создать
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
        title='Удалить стирку?'
        isLoading={isLoading}
        description={`Стирка будет удалена из системы.`}
      />
    </>
  );
};
