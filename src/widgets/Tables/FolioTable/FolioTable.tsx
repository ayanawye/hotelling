import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IFolio {
  id: string;
  guest: string;
  booking: string;
  name: string;
  serviceType: string;
  status: 'Открыто' | 'Частично оплачен' | 'Аннулирован';
  amount: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  Открыто: { label: 'Открыто', color: '#00B368', bgColor: '#E6F9F0' },
  'Частично оплачен': {
    label: 'Частично оплачен',
    color: '#D97706',
    bgColor: '#FEF3C7',
  },
  Аннулирован: { label: 'Аннулирован', color: '#E11D48', bgColor: '#FEE2E2' },
};

export const FolioTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    status: undefined,
  });

  const data: IFolio[] = [
    {
      id: '1',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '2',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Частично оплачен',
      amount: '2 000',
    },
    {
      id: '3',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '4',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '5',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '6',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '7',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Аннулирован',
      amount: '2 000',
    },
    {
      id: '8',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '9',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
    {
      id: '10',
      guest: 'Асанкожоева Назми',
      booking: 'Проживание',
      name: 'Тайский',
      serviceType: 'Массаж',
      status: 'Открыто',
      amount: '2 000',
    },
  ];

  const columns: ColumnsType<IFolio> = [
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
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип услуги',
      dataIndex: 'serviceType',
      key: 'serviceType',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: keyof typeof STATUS_CONFIG) => {
        const config = STATUS_CONFIG[status];
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
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
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
          options={[
            { value: 'Открыто', label: 'Открыто' },
            { value: 'Частично оплачен', label: 'Частично оплачен' },
            { value: 'Аннулирован', label: 'Аннулирован' },
          ]}
          onChange={(value) => setFilter({ ...filter, status: value })}
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
