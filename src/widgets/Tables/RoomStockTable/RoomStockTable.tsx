import { SearchIcon } from '@shared/assets';
import { DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { FilterRooms } from '@features/FilterRooms/FilterRooms.tsx';
import { useNavigate } from 'react-router-dom';
import { TableActions } from '@widgets/TableActions';
import {
  type IRoomStock,
  useDeleteHotelRoomStockMutation,
  useGetHotelRoomStocksQuery,
} from '@entities/rooms';

export const RoomStockTable = () => {
  const navigate = useNavigate();
  const { data } = useGetHotelRoomStocksQuery();
  const [deleteHotelRoomStock, { isLoading }] =
    useDeleteHotelRoomStockMutation();

  console.log(data);

  const [filter, setFilter] = useState({
    search: '',
    enclosure: undefined as string | undefined,
    floor: undefined as string | undefined,
    roomType: undefined as string | undefined,
    status: undefined as string | undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<IRoomStock | null>(null);

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
    },
    {
      title: 'Этаж',
      dataIndex: ['floor', 'floor'],
      key: 'floor',
    },
    {
      title: 'Тип номера',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: 'Примечание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
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
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedStock}
          setDeleteModalOpen={setDeleteModalOpen}
          editLink='edit'
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
        <Button
          type='primary'
          onClick={() => navigate('create')}
          style={{
            height: '40px',
            borderRadius: '20px',
            padding: '0 24px',
            backgroundColor: '#2563EB',
          }}
        >
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
        loading={false}
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
