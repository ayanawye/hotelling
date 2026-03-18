import { SearchIcon } from '@shared/assets';
import { Button, InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { TableActions } from '@widgets/TableActions';
import { type ICashShift, useGetAllCashShiftsQuery } from '@entities/cash';
import { useNavigate } from 'react-router-dom';

export const CashShiftTable = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllCashShiftsQuery();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  console.log(data);

  const columns: ColumnsType<ICashShift> = [
    {
      title: 'Касса',
      dataIndex: 'cashbox_name',
      key: 'cashbox_name',
    },
    {
      title: 'Смена',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return (
          <Tag
            style={{
              border: 'none',
              borderRadius: '12px',
              padding: '2px 12px',
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Открыл',
      dataIndex: 'opened_by',
      key: 'opened_by',
      render: (opened_by) => (opened_by ? opened_by : '-'),
    },
    {
      title: 'Закрыл',
      dataIndex: 'closed_by',
      key: 'closed_by',
      render: (closed_by) => (closed_by ? closed_by : '-'),
    },
    {
      title: 'Заметка',
      dataIndex: 'note',
      key: 'note',
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
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={isLoading}
    />
  );
};
