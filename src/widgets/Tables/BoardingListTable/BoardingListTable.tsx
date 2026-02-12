import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi.ts';
import {
  DeleteIcon,
  DotsIcon,
  EditIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
} from '@shared/assets';
import { useStyles } from '@shared/styles';
import {
  type IReservation,
  type IReservationStatus,
} from '@shared/types/IBooking.ts';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Dropdown, type MenuProps, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import { dateFormat, RESERVATION_STATUS_CONFIG } from '@shared/lib';

import { useNavigate } from 'react-router-dom';
import './BoardingListTable.scss';

export const BoardingListTable = () => {
  const { data } = useFetchAllBookingsQuery();
  const navigate = useNavigate();
  const { bookingStatusTagStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const getActionItems = (record: IReservation): MenuProps['items'] => [
    {
      key: 'add-service',
      label: 'Добавить услугу',
      icon: <PlusIcon />,
      onClick: () => console.log('Add service', record),
    },
    {
      key: 'laundry-order',
      label: 'Заказ в прачку',
      icon: <RefreshIcon />,
      onClick: () => console.log('Laundry order', record),
    },
    {
      key: 'edit',
      label: 'Изменить',
      icon: <EditIcon />,
      onClick: () => navigate('/bookings/create'),
    },
    {
      key: 'delete',
      label: 'Удалить',
      icon: <DeleteIcon />,
      danger: true,
      onClick: () => navigate(`/bookings/edit/${record.id}`),
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
      render: (date) => (date ? dayjs(date).format(dateFormat) : '—'),
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
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionItems(record) }}
          placement='bottomRight'
          trigger={['click']}
        >
          <DotsIcon />
        </Dropdown>
      ),
    },
  ];

  const TableHeader = (
    <div className='table-header'>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
    </div>
  );

  return (
    <TableComponent
      title={TableHeader}
      data={data || []}
      columns={reservationColumns}
      loading={false}
    />
  );
};
