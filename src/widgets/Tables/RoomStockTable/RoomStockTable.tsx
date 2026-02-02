import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { FilterRooms } from '@features/FilterRooms/FilterRooms.tsx';

interface IRoomStock {
  id: string;
  roomNumber: string;
  enclosure: string;
  floor: string;
  roomType: string;
  status: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  Свободен: { label: 'Свободен', color: '#00B368', bgColor: '#E6F9F0' },
  Занят: { label: 'Занят', color: '#E11D48', bgColor: '#FEE2E2' },
  'Требует уборки': {
    label: 'Требует уборки',
    color: '#D97706',
    bgColor: '#FEF3C7',
  },
  Ремонт: { label: 'Ремонт', color: '#6B7280', bgColor: '#F3F4F6' },
};

export const RoomStockTable = () => {
  const [filter, setFilter] = useState({
    search: '',
    enclosure: undefined as string | undefined,
    floor: undefined as string | undefined,
    roomType: undefined as string | undefined,
    status: undefined as string | undefined,
  });

  const data: IRoomStock[] = [
    {
      id: 'INV-1001',
      roomNumber: '101',
      enclosure: 'Корпус 1',
      floor: '1',
      roomType: 'Люкс',
      status: 'Свободен',
    },
    {
      id: 'INV-1002',
      roomNumber: '102',
      enclosure: 'Корпус 1',
      floor: '1',
      roomType: 'Стандарт',
      status: 'Занят',
    },
    {
      id: 'INV-1003',
      roomNumber: '201',
      enclosure: 'Корпус 2',
      floor: '2',
      roomType: 'Делюкс',
      status: 'Требует уборки',
    },
    {
      id: 'INV-1004',
      roomNumber: '202',
      enclosure: 'Корпус 2',
      floor: '2',
      roomType: 'Стандарт',
      status: 'Свободен',
    },
    {
      id: 'INV-1005',
      roomNumber: '301',
      enclosure: 'Корпус 3',
      floor: '3',
      roomType: 'Люкс',
      status: 'Ремонт',
    },
    {
      id: 'INV-1006',
      roomNumber: '302',
      enclosure: 'Корпус 3',
      floor: '3',
      roomType: 'Стандарт',
      status: 'Свободен',
    },
  ];

  const columns: ColumnsType<IRoomStock> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Номер',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Корпус',
      dataIndex: 'enclosure',
      key: 'enclosure',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Тип номера',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = STATUS_CONFIG[status] || {
          label: status,
          color: '#000',
          bgColor: '#f0f0f0',
        };
        return (
          <Tag
            style={{
              background: config.bgColor,
              color: config.color,
              border: 'none',
              borderRadius: '12px',
              padding: '2px 12px',
            }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            style={{ display: 'flex', alignItems: 'center', padding: 0 }}
          >
            Удалить
          </Button>
          <Button
            type='text'
            icon={<EditOutlined />}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Изменить
          </Button>
        </div>
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

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.roomNumber.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.enclosure.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.roomType.toLowerCase().includes(filter.search.toLowerCase());

    const matchesEnclosure =
      !filter.enclosure || item.enclosure === filter.enclosure;
    const matchesFloor = !filter.floor || item.floor === filter.floor;
    const matchesRoomType =
      !filter.roomType || item.roomType === filter.roomType;
    const matchesStatus = !filter.status || item.status === filter.status;

    return (
      matchesSearch &&
      matchesEnclosure &&
      matchesFloor &&
      matchesRoomType &&
      matchesStatus
    );
  });

  return (
    <TableComponent
      title={TableHeader}
      data={filteredData}
      columns={columns}
      loading={false}
    />
  );
};
