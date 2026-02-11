import { SearchIcon } from '@shared/assets';
import {
  Button,
  DeleteModal,
  InputTextField,
  SelectWithSearch,
} from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  useDeleteHotelFloorMutation,
  useGetHotelFloorsQuery,
} from '@entities/rooms';
import type { IHotelFloor } from '@entities/rooms/types';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';

export const FloorsTable = () => {
  const navigate = useNavigate();

  const { data } = useGetHotelFloorsQuery();
  const [deleteHotelFloor, { isLoading }] = useDeleteHotelFloorMutation();

  const [filter, setFilter] = useState({
    search: '',
    enclosure: undefined,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<IHotelFloor | null>(null);

  const handleDelete = async () => {
    try {
      await deleteHotelFloor(selectedFloor?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<IHotelFloor> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Корпус',
      dataIndex: 'enclosure',
      key: 'enclosure',
      render: (_, record) => record.hull?.name || '-',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedFloor}
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
        <SelectWithSearch
          placeholder='Корпус'
          maxTagPlaceholder={() => 'Цвет статуса номера'}
          onChange={(value) => setFilter({ ...filter, enclosure: value })}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
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
        loading={false}
        rowKey='id'
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить этаж?'
        isLoading={isLoading}
        description={`Этаж "${selectedFloor?.floor}" будет удален из системы.`}
      />
    </>
  );
};
