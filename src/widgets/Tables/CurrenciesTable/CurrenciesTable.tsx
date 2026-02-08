import { SearchIcon } from '@shared/assets';
import { Button, InputTextField, SelectWithSearch } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IFinanceCurrency,
  useGetFinanceCurrenciesQuery,
  usePatchFinanceCurrencyMutation,
} from '@entities/finance';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@shared/lib';

export const CurrenciesTable = () => {
  const { data, isLoading } = useGetFinanceCurrenciesQuery();
  const [patchFinanceCurrency, { isLoading: patchLoading }] =
    usePatchFinanceCurrencyMutation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    search: '',
  });

  const handleUpdate = async (id: number, field: string, checked: boolean) => {
    try {
      await patchFinanceCurrency({ id: id, [field]: checked }).unwrap();
      message.success('Успешно обновлено');
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

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
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={() => handleUpdate(record.id, 'is_base', !checked)}
        />
      ),
    },
    {
      title: 'Операционная',
      dataIndex: 'is_operational',
      key: 'is_operational',
      width: '17%',
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={() => handleUpdate(record.id, 'is_operational', !checked)}
        />
      ),
    },
    {
      title: 'Доступна для оплаты',
      dataIndex: 'is_allowed_for_payment',
      key: 'is_allowed_for_payment',
      width: '17%',
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={() =>
            handleUpdate(record.id, 'is_allowed_for_payment', !checked)
          }
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
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={() => handleUpdate(record.id, 'is_active', !checked)}
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
        <Button variant='primary' onClick={() => navigate('create')}>
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
      loading={isLoading || patchLoading}
    />
  );
};
