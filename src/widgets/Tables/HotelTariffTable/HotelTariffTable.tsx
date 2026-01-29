import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IHotelTariff {
  id: string;
  name: string;
  organization: string;
  roomType: string;
  price: string;
  manualSum: boolean;
  earlyCheckIn: string;
  lateCheckOut: string;
}

const ROOM_TYPE_COLORS: Record<string, { color: string; bgColor: string }> = {
  Люкс: { color: '#00B368', bgColor: '#E6F9F0' },
  Стандарт: { color: '#D97706', bgColor: '#FEF3C7' },
  Делюкс: { color: '#E11D48', bgColor: '#FEE2E2' },
};

export const HotelTariffTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    select: undefined,
  });

  const data: IHotelTariff[] = [
    {
      id: '1',
      name: 'Корпоративный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '2',
      name: 'Договорной',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: false,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '3',
      name: 'Партнёрский',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '4',
      name: 'Индивидуальный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: false,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '5',
      name: 'Контрактный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '6',
      name: 'Корпоративный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '7',
      name: 'Корпоративный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '8',
      name: 'Корпоративный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '9',
      name: 'Корпоративный',
      organization: '«Алхимик»',
      roomType: 'Люкс',
      price: '13 000',
      manualSum: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
  ];

  const columns: ColumnsType<IHotelTariff> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Организация',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Тип номера',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (type) => {
        const config = ROOM_TYPE_COLORS[type] || {
          color: '#D97706',
          bgColor: '#FEF3C7',
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
            {type}
          </Tag>
        );
      },
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ручной ввод суммы',
      dataIndex: 'manualSum',
      key: 'manualSum',
      render: (manualSum) => (
        <Switch
          checked={manualSum}
          style={{ backgroundColor: manualSum ? '#52C41A' : undefined }}
        />
      ),
    },
    {
      title: 'Ранний заезд',
      dataIndex: 'earlyCheckIn',
      key: 'earlyCheckIn',
    },
    {
      title: 'Поздний выезд',
      dataIndex: 'lateCheckOut',
      key: 'lateCheckOut',
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
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[{ value: 'select', label: 'Select' }]}
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
