import { DotsIcon, SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import type { IReservation } from '@shared/types/IBooking.ts';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';

export const BoardingListTable = () => {
  const { tableHeaderStyle, bookingStatusTagStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const data: IReservation[] = [
    {
      id: 1,
      hotel: 101,
      guest: {
        id: 55,
        first_name: 'Ayana',
        last_name: 'Kaychibekova',
        middle_name: 'Maratovna',
      },
      organization: {
        id: 10,
        name: 'Attractor Software',
      },
      room: 305,
      guarantee_type: 'type1',
      arrival_datetime: '2026-02-01T14:00:00Z',
      departure_datetime: '2026-02-05T12:00:00Z',
      nights: 4,
      adults: 2,
      children: 0,
      infants: 0,
      status: 'status1',
      group_id: '550e8400-e29b-41d4-a716-446655440000',
    },
  ];

  const reservationColumns: ColumnsType<IReservation> = [
    {
      title: 'Гость',
      key: 'guest',
      width: '25%',
      render: (_, record) =>
        `${record.guest.last_name} ${record.guest.first_name}`,
    },
    {
      title: 'Гостей',
      key: 'guestsCount',
      width: '13%',
      render: (_, record) =>
        (record.adults ?? 0) + (record.children ?? 0) + (record.infants ?? 0),
    },
    {
      title: 'Номер',
      dataIndex: 'room',
      key: 'room',
      width: '13%',
      render: (room) => room ?? '—',
    },
    {
      title: 'Заезд',
      dataIndex: 'arrival_datetime',
      key: 'arrival_datetime',
      width: '15%',
      render: (date) => (date ? dayjs(date).format('DD.MM.YYYY') : '—'),
    },
    {
      title: 'Выезд',
      dataIndex: 'departure_datetime',
      key: 'departure_datetime',
      width: '15%',
      render: (date) => (date ? dayjs(date).format('DD.MM.YYYY') : '—'),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status) => (
        <Tag style={bookingStatusTagStyle} color='blue'>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '10%',
      render: () => (
        <Button>
          <DotsIcon />
        </Button>
      ),
    },
  ];

  const TableHeader = (
    <Space style={tableHeaderStyle}>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
    </Space>
  );

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={reservationColumns}
      loading={false}
    />
  );
};
