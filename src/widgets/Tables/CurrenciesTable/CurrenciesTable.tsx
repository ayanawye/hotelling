import { SearchIcon } from '@shared/assets';
import { InputTextField, SelectWithSearch } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IFinanceCurrency,
  useGetFinanceCurrenciesQuery,
} from '@entities/finance';

export const CurrenciesTable = () => {
  const { data } = useGetFinanceCurrenciesQuery();

  const [filter, setFilter] = useState({
    search: '',
  });

  console.log(data);

  const columns: ColumnsType<IFinanceCurrency> = [
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      width: '12%',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '13%',
    },
    {
      title: 'Базовая',
      dataIndex: 'is_base',
      key: 'is_base',
      width: '17%',
      render: (checked) => (
        <Switch
          checked={checked}
          style={{
            backgroundColor: checked ? '#52C41A' : undefined,
          }}
        />
      ),
    },
    {
      title: 'Операционная',
      dataIndex: 'is_operational',
      key: 'is_operational',
      width: '17%',
      render: (checked) => (
        <Switch
          checked={checked}
          style={{
            backgroundColor: checked ? '#52C41A' : undefined,
          }}
        />
      ),
    },
    {
      title: 'Доступна для оплаты',
      dataIndex: 'is_allowed_for_payment',
      key: 'is_allowed_for_payment',
      width: '17%',
      render: (checked) => (
        <Switch
          checked={checked}
          style={{
            backgroundColor: checked ? '#52C41A' : undefined,
          }}
        />
      ),
    },
    {
      title: 'Курс к базовой валюте',
      dataIndex: 'rate_to_base',
      key: 'rate_to_base',
      width: '17%',
    },
    {
      title: 'Активна',
      dataIndex: 'is_active',
      key: 'is_active',
      width: '7%',
      render: (checked) => (
        <Switch
          checked={checked}
          style={{
            backgroundColor: checked ? '#52C41A' : undefined,
          }}
        />
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
          placeholder='Select'
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
