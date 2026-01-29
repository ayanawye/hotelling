import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IServiceOrder {
  id: string;
  guest: string;
  booking: string;
  service: string;
  count: number;
  pricePerUnit: string;
  total: string;
  shift: string;
}

export const ServiceOrdersTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    select: undefined,
  });

  const data: IServiceOrder[] = [
    {
      id: '1',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Массаж',
      count: 2,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '2',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Проживание',
      count: 3,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '3',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Завтрак',
      count: 1,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '4',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Ресторан',
      count: 2,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '5',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Прачка',
      count: 3,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '6',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Массаж',
      count: 4,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '7',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Прачка',
      count: 2,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '8',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Прачка',
      count: 2,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
    {
      id: '9',
      guest: 'Иванов Иван',
      booking: 'Проживание',
      service: 'Прачка',
      count: 1,
      pricePerUnit: '10 000',
      total: '10 000',
      shift: 'Ибраимов А.',
    },
  ];

  const columns: ColumnsType<IServiceOrder> = [
    {
      title: 'Гость',
      dataIndex: 'guest',
      key: 'guest',
    },
    {
      title: 'Бронирование',
      dataIndex: 'booking',
      key: 'booking',
    },
    {
      title: 'Услуга',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Кол-во',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Цена за ед.',
      dataIndex: 'pricePerUnit',
      key: 'pricePerUnit',
    },
    {
      title: 'Сумма',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Смена',
      dataIndex: 'shift',
      key: 'shift',
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
    <div
      style={{
        ...tableHeaderStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        <InputTextField
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[]}
          onChange={(value) => setFilter({ ...filter, select: value })}
          allowClear
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

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={false}
    />
  );
};
