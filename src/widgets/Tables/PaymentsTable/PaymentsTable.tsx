import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IPayment {
  id: string;
  paymentType: string;
  amount: string;
  date: string;
  status: 'Оплачено' | 'В ожидании' | 'Отменено';
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  Оплачено: { label: 'Оплачено', color: '#00B368', bgColor: '#E6F9F0' },
  'В ожидании': { label: 'В ожидании', color: '#D97706', bgColor: '#FEF3C7' },
  Отменено: { label: 'Отменено', color: '#E11D48', bgColor: '#FEE2E2' },
};

export const PaymentsTable = () => {
  const [filter, setFilter] = useState({
    search: '',
    status: undefined,
  });

  const data: IPayment[] = [
    {
      id: 'INV-1001',
      paymentType: 'CASH',
      amount: '50 000 ₸',
      date: '20.01.2024',
      status: 'Оплачено',
    },
    {
      id: 'INV-1002',
      paymentType: 'CARD',
      amount: '120 000 ₸',
      date: '21.01.2024',
      status: 'В ожидании',
    },
    {
      id: 'INV-1003',
      paymentType: 'Transfer',
      amount: '75 000 ₸',
      date: '22.01.2024',
      status: 'Отменено',
    },
    {
      id: 'INV-1004',
      paymentType: 'CASH',
      amount: '30 000 ₸',
      date: '23.01.2024',
      status: 'Оплачено',
    },
    {
      id: 'INV-1005',
      paymentType: 'CARD',
      amount: '200 000 ₸',
      date: '24.01.2024',
      status: 'Оплачено',
    },
  ];

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
        <Select
          placeholder='Select'
          style={{ width: 200, height: 40 }}
          options={[
            { value: 'Оплачено', label: 'Оплачено' },
            { value: 'В ожидании', label: 'В ожидании' },
            { value: 'Отменено', label: 'Отменено' },
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
