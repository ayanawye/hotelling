import { SearchIcon } from '@shared/assets';
import { InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { TableActions } from '@widgets/TableActions';
import { type ICashBalance, useGetAllCashBalanceQuery } from '@entities/cash';

export const CashBalanceTable = () => {
  const { data, isLoading, isError } = useGetAllCashBalanceQuery();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  const columns: ColumnsType<ICashBalance> = [
    {
      title: 'Касса',
      dataIndex: 'cashbox_name',
      key: 'cashbox_name',
    },
    {
      title: 'Валюты',
      dataIndex: 'currency_code',
      key: 'currency_code',
    },
    {
      title: 'Баланс',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => <TableActions record={record} readonly />,
    },
  ];

  const TableHeader = (
    <div className='table-header'>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <div className='table-header-filter'>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[]}
          onChange={(value) => setFilter({ ...filter, category: value })}
          allowClear
        />
      </div>
    </div>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={false}
    />
  );
};
