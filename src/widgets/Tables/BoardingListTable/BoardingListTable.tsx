import {
  useDeleteBookingMutation,
  useFetchAllBookingsQuery,
} from '@entities/booking/api/bookingApi.ts';
import { useGetHotelRoomsTypesQuery } from '@entities/rooms/api/roomsTypeApi';
import { useGetHotelRoomsStatusQuery } from '@entities/rooms/api/roomsStatus.ts';
import {
  DeleteIcon,
  DotsIcon,
  EditIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
  FilerIcon2,
  CloseIcon,
} from '@shared/assets';
import { useStyles } from '@shared/styles';
import type {
  IReservation,
  IReservationStatus,
} from '@shared/types/IBooking.ts';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import {
  DatePicker,
  Dropdown,
  Select,
  type MenuProps,
  message,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState, useRef, useEffect } from 'react';
import { dateFormat, RESERVATION_STATUS_CONFIG } from '@shared/lib';
import { useNavigate } from 'react-router-dom';

import './BoardingListTable.scss';

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
  const { data: roomTypes } = useGetHotelRoomsTypesQuery();
  const { data: roomStatuses } = useGetHotelRoomsStatusQuery();

  const [filter, setFilter] = useState({
    search: '',
  });

  // Filter panel state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState<dayjs.Dayjs | null>(
    null,
  );
  const [filterEndDate, setFilterEndDate] = useState<dayjs.Dayjs | null>(null);
  const [filterBookingStatus, setFilterBookingStatus] =
    useState<IReservationStatus | null>(null);
  const [filterRoomStatus, setFilterRoomStatus] = useState<number | null>(null);
  const [filterRoomType, setFilterRoomType] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const handleApplyFilter = () => {
    if (filterStartDate || filterEndDate) {
      setDates([filterStartDate, filterEndDate]);
    } else {
      setDates(null);
    }
    setFilterOpen(false);
  };

  const handleResetAll = () => {
    setFilterStartDate(null);
    setFilterEndDate(null);
    setFilterBookingStatus(null);
    setFilterRoomStatus(null);
    setFilterRoomType(null);
    setDates(null);
    setFilterOpen(false);
  };

  const bookingStatusOptions = Object.entries(RESERVATION_STATUS_CONFIG).map(
    ([key, val]) => ({ value: key, label: val.label }),
  );

  const roomTypeOptions =
    roomTypes?.map((rt) => ({ value: rt.id, label: rt.name })) || [];

  const roomStatusOptions =
    roomStatuses?.map((rs) => ({ value: rs.id!, label: rs.name || '' })) || [];

  // Apply client-side filters
  const filteredData = (data || []).filter((booking) => {
    // Search filter
    if (filter.search) {
      const guest = booking.guest;
      if (!guest) return false;
      const fullName = [guest.last_name, guest.first_name, guest.middle_name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!fullName.includes(filter.search.toLowerCase())) return false;
    }
    // Booking status filter
    if (filterBookingStatus && booking.status !== filterBookingStatus) {
      return false;
    }
    return true;
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

        <div className='filter-btn-wrapper' ref={filterRef}>
          <button
            className='filter-toggle-btn'
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <FilerIcon2 />
            Фильтр
          </button>

          {filterOpen && (
            <div className='filter-panel'>
              <div className='filter-panel-header'>
                <div className='filter-panel-title'>
                  <FilerIcon2 />
                  <span>Фильтр</span>
                </div>
                <button
                  className='filter-panel-close'
                  onClick={() => setFilterOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className='filter-panel-body'>
                <div className='filter-section'>
                  <div className='filter-section-label'>Дата</div>
                  <div className='filter-dates-row'>
                    <div className='filter-date-field'>
                      <label className='filter-date-label'>Начало</label>
                      <DatePicker
                        value={filterStartDate}
                        onChange={setFilterStartDate}
                        format='DD-MM-YYYY'
                        placeholder='Выберите дату'
                        className='filter-date-picker'
                        allowClear={false}
                      />
                    </div>
                    <div className='filter-date-field'>
                      <label className='filter-date-label'>Конец</label>
                      <DatePicker
                        value={filterEndDate}
                        onChange={setFilterEndDate}
                        format='DD-MM-YYYY'
                        placeholder='Выберите дату'
                        className='filter-date-picker'
                        allowClear={false}
                      />
                    </div>
                  </div>
                </div>

                <div className='filter-section'>
                  <div className='filter-section-header'>
                    <span className='filter-section-label'>
                      Выберите статус
                    </span>
                    <button
                      className='filter-reset-link'
                      onClick={() => setFilterBookingStatus(null)}
                    >
                      Сбросить
                    </button>
                  </div>
                  <Select
                    value={filterBookingStatus}
                    onChange={setFilterBookingStatus}
                    placeholder='Статус брони'
                    options={bookingStatusOptions}
                    allowClear
                    className='filter-select'
                    size='large'
                  />
                </div>

                <div className='filter-section'>
                  <div className='filter-section-header'>
                    <span className='filter-section-label'>
                      Выберите статус
                    </span>
                    <button
                      className='filter-reset-link'
                      onClick={() => setFilterRoomStatus(null)}
                    >
                      Сбросить
                    </button>
                  </div>
                  <Select
                    value={filterRoomStatus}
                    onChange={setFilterRoomStatus}
                    placeholder='Статус проживания'
                    options={roomStatusOptions}
                    allowClear
                    className='filter-select'
                    size='large'
                  />
                </div>

                <div className='filter-section'>
                  <div className='filter-section-header'>
                    <span className='filter-section-label'>
                      Выберите тип номера
                    </span>
                    <button
                      className='filter-reset-link'
                      onClick={() => setFilterRoomType(null)}
                    >
                      Сбросить
                    </button>
                  </div>
                  <Select
                    value={filterRoomType}
                    onChange={setFilterRoomType}
                    placeholder='Тип номера'
                    options={roomTypeOptions}
                    allowClear
                    className='filter-select'
                    size='large'
                  />
                </div>
              </div>

              <div className='filter-panel-footer'>
                <button className='filter-reset-btn' onClick={handleResetAll}>
                  Сбросить все
                </button>
                <button
                  className='filter-apply-btn'
                  onClick={handleApplyFilter}
                >
                  Применить
                </button>
              </div>
            </div>
          )}
        </div>
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
        data={filteredData}
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
