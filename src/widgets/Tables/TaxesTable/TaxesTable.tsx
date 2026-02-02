import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface ITax {
  id: string;
  code: string;
  name: string;
  percent: string;
  includeInPrice: boolean;
  note: string;
}

export const TaxesTable = () => {
  const [filter, setFilter] = useState({
    search: '',
    select: undefined,
  });

  const data: ITax[] = Array.from({ length: 9 }).map((_, index) => ({
    id: `INV-1001-${index}`,
    code: 'INV-1001',
    name: 'INV-1001',
    percent: '7%',
    includeInPrice: [1, 3, 4, 6].includes(index), // Имитация переключателей со скриншота
    note: 'INV-1001',
  }));

  const columns: ColumnsType<ITax> = [
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
      title: 'Процент',
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: 'Включить в стоимость',
      dataIndex: 'includeInPrice',
      key: 'includeInPrice',
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
      title: 'Примечание',
      dataIndex: 'note',
      key: 'note',
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
              fontWeight: 500,
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
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          onChange={(value) => setFilter({ ...filter, select: value })}
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
