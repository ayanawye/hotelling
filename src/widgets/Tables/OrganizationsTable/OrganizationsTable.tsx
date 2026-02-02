import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IOrganization {
  id: string;
  name: string;
  clientType: string;
  inn: string;
  bank: string;
  account: string;
}

export const OrganizationsTable = () => {
  const [filter, setFilter] = useState({
    search: '',
    type: undefined,
  });

  const data: IOrganization[] = Array(10)
    .fill({
      id: '1',
      name: 'ОсОО «Альфа Консалт Групп»',
      clientType: 'Физ. Лицо',
      inn: '01203202110045',
      bank: 'ОАО «Оптима Банк»',
      account: 'KZ12 3',
    })
    .map((item, index) => ({ ...item, id: String(index + 1) }));

  const columns: ColumnsType<IOrganization> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип клиента',
      dataIndex: 'clientType',
      key: 'clientType',
    },
    {
      title: 'ИНН',
      dataIndex: 'inn',
      key: 'inn',
    },
    {
      title: 'Банк',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Расч-ь',
      dataIndex: 'account',
      key: 'account',
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
          style={{ width: 120, height: 40 }}
          options={[{ value: 'select', label: 'Select' }]}
          onChange={(value) => setFilter({ ...filter, type: value })}
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
