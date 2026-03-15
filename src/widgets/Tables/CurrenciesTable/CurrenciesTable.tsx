import { SearchIcon } from '@shared/assets';
import { Button, InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, message, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IFinanceCurrency,
  useGetFinanceCurrenciesQuery,
  usePatchFinanceCurrencyMutation,
} from '@entities/finance';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@shared/lib';
import {
  FilterComponent,
  type FilterConfig,
} from '@features/FilterComponent/FilterComponent.tsx';

const filterInitialState = {
  is_base: null,
  is_operational: null,
  is_allowed_for_payment: null,
  is_rate_static: null,
  is_active: null,
};

export const CurrenciesTable = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    search: '',
    ...filterInitialState,
  });

  const { data, isLoading, isError } = useGetFinanceCurrenciesQuery(filter);
  console.log(filter);
  const [patchFinanceCurrency, { isLoading: patchLoading }] =
    usePatchFinanceCurrencyMutation();

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
      className: 'noWrapColumn',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      className: 'noWrapColumn',
    },
    {
      title: 'Статичный курс',
      dataIndex: 'is_rate_static',
      key: 'is_rate_static',
      className: 'noWrapColumn',
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={() => handleUpdate(record.id, 'is_rate_static', !checked)}
        />
      ),
    },
    {
      title: 'Базовая',
      dataIndex: 'is_base',
      key: 'is_base',
      className: 'noWrapColumn',
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
      className: 'noWrapColumn',
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
      className: 'noWrapColumn',
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
      className: 'noWrapColumn',
    },
    {
      title: 'Активна',
      dataIndex: 'is_active',
      key: 'is_active',
      className: 'noWrapColumn',
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={() => handleUpdate(record.id, 'is_active', !checked)}
        />
      ),
    },
  ];

  const filterConfigs: FilterConfig[] = [
    {
      name: 'is_active',
      label: 'Активна',
      type: 'checkbox',
    },
    {
      name: 'is_rate_static',
      label: 'Статический курс',
      type: 'checkbox',
    },
    {
      name: 'is_allowed_for_payment',
      label: 'Доступна для оплаты',
      type: 'checkbox',
    },
    {
      name: 'is_operational',
      label: 'Операционная валюта',
      type: 'checkbox',
    },
    {
      name: 'is_base',
      label: 'Базовая валюта',
      type: 'checkbox',
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
        <FilterComponent
          initialFilters={filter}
          configs={filterConfigs}
          onApply={(newFilters) => setFilter({ ...filter, ...newFilters })}
          onResetAll={() =>
            setFilter({
              ...filter,
              ...filterInitialState,
            })
          }
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          Создать
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки налогов' type='error' />;
  }

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={isLoading || patchLoading}
      tableLayout={'auto'}
    />
  );
};
