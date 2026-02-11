import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  useDeleteHotelEnclosureMutation,
  useGetHotelEnclosuresQuery,
} from '@entities/rooms';
import { TableActions } from '@widgets/TableActions';
import type { IHotelEnclosure } from '@entities/rooms/types';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getErrorMessage } from '@shared/lib';

export const EnclosuresTable = () => {
  const navigate = useNavigate();

  const { data } = useGetHotelEnclosuresQuery();
  const [deleteHotelEnclosure, { isLoading }] =
    useDeleteHotelEnclosureMutation();

  const [filter, setFilter] = useState({
    search: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEnclosure, setSelectedEnclosure] =
    useState<IHotelEnclosure | null>(null);

  const handleDelete = async () => {
    try {
      await deleteHotelEnclosure(selectedEnclosure?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IHotelEnclosure> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          setSelectedItem={setSelectedEnclosure}
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
      <Button variant='primary' onClick={() => navigate('create')}>
        <span>Создать</span>
      </Button>
    </div>
  );

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={false}
        rowKey='id'
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить корпус?'
        isLoading={isLoading}
        description={`Корпус "${selectedEnclosure?.name}" будет удален из системы.`}
      />
    </>
  );
};
