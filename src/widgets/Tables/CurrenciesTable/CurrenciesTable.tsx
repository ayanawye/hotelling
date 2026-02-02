import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface ICurrency {
  id: string;
  code: string;
  name: string;
  isBase: boolean;
  isOperational: boolean;
  isAvailableForPayment: boolean;
  rateToBase: string;
  isActive: boolean;
}

export const CurrenciesTable = () => {
  const [filter, setFilter] = useState({
    search: '',
  });

  const data: ICurrency[] = [
    {
      id: '1',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: false,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '2',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: true,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '3',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: false,
      isOperational: false,
      isAvailableForPayment: true,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '4',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: false,
      isOperational: true,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '5',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: true,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '6',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: true,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '7',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: false,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '8',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: false,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
    {
      id: '9',
      code: 'INV-1001',
      name: 'INV-1001',
      isBase: false,
      isOperational: false,
      isAvailableForPayment: false,
      rateToBase: 'INV-1001',
      isActive: false,
    },
  ];

  const columns: ColumnsType<ICurrency> = [
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Базовая',
      dataIndex: 'isBase',
      key: 'isBase',
      render: (checked) => <Switch checked={checked} />,
    },
    {
      title: 'Операционная',
      dataIndex: 'isOperational',
      key: 'isOperational',
      render: (checked) => <Switch checked={checked} />,
    },
    {
      title: 'Доступна для оплаты',
      dataIndex: 'isAvailableForPayment',
      key: 'isAvailableForPayment',
      render: (checked) => <Switch checked={checked} />,
    },
    {
      title: 'Курс к базовой валюте',
      dataIndex: 'rateToBase',
      key: 'rateToBase',
    },
    {
      title: 'Активна',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (checked) => <Switch checked={checked} />,
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
          style={{ width: 120, height: 40 }}
          options={[]}
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
