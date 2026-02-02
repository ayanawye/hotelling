import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField, SelectWithSearch } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { type IPayment, useGetPaymentsQuery } from '@entities/finance';

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  Оплачено: { label: 'Оплачено', color: '#00B368', bgColor: '#E6F9F0' },
  'В ожидании': { label: 'В ожидании', color: '#D97706', bgColor: '#FEF3C7' },
  Отменено: { label: 'Отменено', color: '#E11D48', bgColor: '#FEE2E2' },
};

export const PaymentsTable = () => {
  const { data } = useGetPaymentsQuery();
  const [filter, setFilter] = useState({
    search: '',
    status: undefined,
  });

  const columns: ColumnsType<IPayment> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Тип оплаты',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = STATUS_CONFIG[status] || {
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
    <div className='table-header'>
      <div style={{ display: 'flex', gap: '16px' }}>
        <InputTextField
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
      </div>
      <div className='table-header-filter'>
        <SelectWithSearch
          placeholder='Оплаты'
          maxTagPlaceholder={() => 'Цвет статуса номера'}
          onChange={() => setFilter({ ...filter })}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
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
