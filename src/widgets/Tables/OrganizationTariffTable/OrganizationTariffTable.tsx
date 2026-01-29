import { DeleteOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IOrganizationTariff {
  id: string;
  name: string;
  roomType: string;
  price: string;
  manualInput: boolean;
  earlyCheckIn: string;
  lateCheckOut: string;
}

export const OrganizationTariffTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const data: IOrganizationTariff[] = [
    {
      id: '1',
      name: 'Корпоративный',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '2',
      name: 'Индивидуальный',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: false,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '3',
      name: 'Партнёрский',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '4',
      name: 'Контрактный',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: false,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '5',
      name: 'Корпоративный',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '6',
      name: 'Договорной',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '7',
      name: 'Договорной',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '8',
      name: 'Договорной',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
    {
      id: '9',
      name: 'Договорной',
      roomType: 'Люкс',
      price: '13 000',
      manualInput: true,
      earlyCheckIn: '14:00',
      lateCheckOut: '16:00',
    },
  ];

  const columns: ColumnsType<IOrganizationTariff> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип номера',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (type) => (
        <Tag
          style={{
            background: type === 'Люкс' ? '#E6F9F0' : '#FEE2E2',
            color: type === 'Люкс' ? '#00B368' : '#E11D48',
            border: 'none',
            borderRadius: '12px',
            padding: '2px 12px',
          }}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ручной ввод',
      dataIndex: 'manualInput',
      key: 'manualInput',
      render: (checked) => <Switch checked={checked} />,
    },
    {
      title: 'Ранний заезд',
      dataIndex: 'earlyCheckIn',
      key: 'earlyCheckIn',
    },
    {
      title: 'Поздний отъезд',
      dataIndex: 'lateCheckOut',
      key: 'lateCheckOut',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: () => (
        <Button
          type='text'
          danger
          icon={<DeleteOutlined />}
          style={{ display: 'flex', alignItems: 'center', padding: 0 }}
        >
          Удалить
        </Button>
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
