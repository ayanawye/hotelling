import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IRoomStatus {
  id: string;
  name: string;
  code: string;
  statusColor: string;
}

const STATUS_COLOR_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  Свободен: { label: 'Свободен', color: '#00B368', bgColor: '#E6F9F0' },
  'Требует уборки': {
    label: 'Требует уборки',
    color: '#D97706',
    bgColor: '#FEF3C7',
  },
  Занят: { label: 'Занят', color: '#E11D48', bgColor: '#FEE2E2' },
  Люкс: { label: 'Люкс', color: '#00B368', bgColor: '#E6F9F0' },
};

export const RoomStatusTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    statusColor: undefined,
  });

  const data: IRoomStatus[] = [
    {
      id: '1',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Свободен',
    },
    {
      id: '2',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Требует уборки',
    },
    {
      id: '3',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Занят',
    },
    {
      id: '4',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Люкс',
    },
    {
      id: '5',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Занят',
    },
    {
      id: '6',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Требует уборки',
    },
    {
      id: '7',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Люкс',
    },
    {
      id: '8',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Требует уборки',
    },
    {
      id: '9',
      name: 'INV-1001',
      code: 'INV-1001',
      statusColor: 'Люкс',
    },
  ];

  const columns: ColumnsType<IRoomStatus> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Цвет статуса',
      dataIndex: 'statusColor',
      key: 'statusColor',
      render: (status) => {
        const config = STATUS_COLOR_CONFIG[status] || {
          label: status,
          color: '#000',
          bgColor: '#f0f0f0',
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
            {config.label}
          </Tag>
        );
      },
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
          placeholder='Цвет статуса номера'
          style={{ width: 200, height: 40 }}
          options={[
            { value: 'Свободен', label: 'Свободен' },
            { value: 'Требует уборки', label: 'Требует уборки' },
            { value: 'Занят', label: 'Занят' },
            { value: 'Люкс', label: 'Люкс' },
          ]}
          onChange={(value) => setFilter({ ...filter, statusColor: value })}
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
