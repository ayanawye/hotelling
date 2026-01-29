import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi.ts';
import { DotsIcon, SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import {
  type IReservation,
  type IReservationStatus,
  RESERVATION_STATUS_CONFIG,
} from '@shared/types/IBooking.ts';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';

export const BoardingListTable = () => {
  const { data } = useFetchAllBookingsQuery();
  const { tableHeaderStyle, bookingStatusTagStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

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
      width: '20%',
      render: (status: IReservationStatus) => {
        const { label, bgColor, textColor } = RESERVATION_STATUS_CONFIG[status];
        return (
          <Tag
            style={{
              ...bookingStatusTagStyle,
              background: bgColor,
              color: textColor,
            }}
          >
            {label}
          </Tag>
        );
      },
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
