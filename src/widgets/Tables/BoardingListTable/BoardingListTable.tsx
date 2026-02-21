import {
  useDeleteBookingMutation,
  useFetchAllBookingsQuery,
} from '@entities/booking/api/bookingApi.ts';
import {
  DeleteIcon,
  DotsIcon,
  EditIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
} from '@shared/assets';
import { useStyles } from '@shared/styles';
import type {
  IReservation,
  IReservationStatus,
} from '@shared/types/IBooking.ts';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { DatePicker, Dropdown, type MenuProps, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import { dateFormat, RESERVATION_STATUS_CONFIG } from '@shared/lib';
import { useNavigate } from 'react-router-dom';

import './BoardingListTable.scss';

const { RangePicker } = DatePicker;

export const BoardingListTable = () => {
  const [dates, setDates] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const { data, isLoading } = useFetchAllBookingsQuery(
    dates?.[0] && dates?.[1]
      ? {
          arrival_from: dates[0].startOf('day').toISOString(),
          arrival_to: dates[1].endOf('day').toISOString(),
        }
      : undefined,
  );
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();
  const navigate = useNavigate();
  const { bookingStatusTagStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  const handleDelete = async () => {
    if (deleteModalState.id) {
      try {
        await deleteBooking(deleteModalState.id).unwrap();
        message.success('Бронирование удалено');
        setDeleteModalState({ isOpen: false, id: null });
      } catch (e) {
        message.error('Ошибка при удалении');
      }
    }
  };

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
      onClick: () => navigate(`/bookings/edit/${record.id}`),
    },
    {
      key: 'delete',
      label: 'Удалить',
      icon: <DeleteIcon />,
      danger: true,
      onClick: () => setDeleteModalState({ isOpen: true, id: record.id }),
    },
  ];

  const reservationColumns: ColumnsType<IReservation> = [
    {
      title: 'Гость',
      key: 'guest',
      width: '25%',
      render: (_, record) => {
        if (!record.guest) return '—';
        const {
          last_name = '',
          first_name = '',
          middle_name = '',
        } = record.guest;
        const fullName = [last_name, first_name, middle_name]
          .filter(Boolean)
          .join(' ');
        return fullName || '—';
      },
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
        const config = RESERVATION_STATUS_CONFIG[status];
        if (!config) {
          return <Tag>{status || '—'}</Tag>;
        }
        const { label, bgColor, textColor } = config;
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
      <div className='table-header-filter'>
        <InputTextField
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
        <RangePicker
          value={dates}
          onChange={(values) => setDates(values)}
          placeholder={['Заезд от', 'Заезд до']}
          format='DD.MM.YYYY'
        />
      </div>
      <Button variant='primary' onClick={() => navigate('/bookings/create')}>
        <span>Создать</span>
      </Button>
    </div>
  );

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data || []}
        columns={reservationColumns}
        loading={isLoading}
      />
      <DeleteModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, id: null })}
        onDelete={handleDelete}
        title='Удалить бронирование'
        description='Вы действительно хотите удалить это бронирование? Это действие нельзя будет отменить.'
        isLoading={isDeleting}
      />
    </>
  );
};
