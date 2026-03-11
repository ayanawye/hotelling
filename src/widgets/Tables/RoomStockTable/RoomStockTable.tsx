import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { FilterRooms } from '@features/FilterRooms/FilterRooms.tsx';
import { useNavigate } from 'react-router-dom';
import { TableActions } from '@widgets/TableActions';
import {
  type IRoomStock,
  useDeleteHotelRoomStockMutation,
  useGetHotelEnclosuresQuery,
  useGetHotelFloorsQuery,
  useGetHotelRoomStocksQuery,
  useGetHotelRoomsTypesQuery,
} from '@entities/rooms';

export const RoomStockTable = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    search: '',
    enclosure: undefined as string | undefined,
    floor: undefined as string | undefined,
    roomType: undefined as string | undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<IRoomStock | null>(null);

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetHotelRoomStocksQuery(filter);
  const { data: hulls } = useGetHotelEnclosuresQuery();
  const { data: floors } = useGetHotelFloorsQuery();
  const { data: roomTypes } = useGetHotelRoomsTypesQuery();
  const [deleteHotelRoomStock, { isLoading }] =
    useDeleteHotelRoomStockMutation();

  const handleDelete = async () => {
    try {
      await deleteHotelRoomStock(selectedStock?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error('Удаление невозможно');
    }
  };

  const columns: ColumnsType<IRoomStock> = [
    {
      title: 'Корпус',
      dataIndex: ['hull', 'name'],
      key: 'hull',
      className: 'noWrapColumn',
    },
    {
      title: 'Этаж',
      dataIndex: ['floor', 'floor'],
      key: 'floor',
      className: 'noWrapColumn',
    },
    {
      title: 'Тип номера',
      dataIndex: ['room_type', 'id'],
      key: 'room_type',
      className: 'noWrapColumn',
      render: (_, record) => {
        return (
          <Tag
            style={{
              background: record?.room_type?.color,
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              padding: '2px 12px',
            }}
          >
            {record?.room_type?.name}
          </Tag>
        );
      },
    },
    {
      title: 'Номер комнаты',
      dataIndex: 'room',
      key: 'room',
      className: 'noWrapColumn',
    },
    {
      title: 'Примечание',
      dataIndex: 'description',
      key: 'description',
      width: '12%',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      className: 'noWrapColumn',
      render: (status) => {
        return (
          <Tag
            style={{
              background: status.color,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '2px 12px',
            }}
          >
            {status.name}
          </Tag>
        );
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '15%',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedStock}
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
        <FilterRooms
          initialFilters={{
            enclosure: filter.enclosure,
            floor: filter.floor,
            roomType: filter.roomType,
          }}
          enclosure={hulls}
          floors={floors}
          roomTypes={roomTypes}
          onApply={(newFilters) => setFilter({ ...filter, ...newFilters })}
          onResetAll={() =>
            setFilter({
              ...filter,
              enclosure: undefined,
              floor: undefined,
              roomType: undefined,
            })
          }
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          Создать
        </Button>
      </div>
    </div>
  );

  if (isDataLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки фондов' type='error' />;
  }

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={false}
        tableLayout={'auto'}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        isLoading={isLoading}
        title='Удалить номерной фонд?'
        description={`Номерной фонд "${selectedStock?.id}" будет удален из системы.`}
      />
    </>
  );
};
