import { useFetchAllBookingsQuery } from '@entities/booking/api/bookingApi';
import { Spin, Table } from 'antd';
import type { FC } from 'react';

const List: FC = () => {
  const { data: bookings, isLoading } = useFetchAllBookingsQuery();

  if (isLoading) {
    return <Spin size='large' />;
  }

  // if (error) {
  //   return <Alert message='Ошибка загрузки бронирований' type='error' />;
  // }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Номер комнаты', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Имя гостя', dataIndex: 'guestName', key: 'guestName' },
    { title: 'Дата заезда', dataIndex: 'startDate', key: 'startDate' },
    { title: 'Дата выезда', dataIndex: 'endDate', key: 'endDate' },
  ];

  return (
    <div>
      <h1>Список бронирований</h1>
      <Table dataSource={bookings} columns={columns} rowKey='id' />
    </div>
  );
};

export default List;
