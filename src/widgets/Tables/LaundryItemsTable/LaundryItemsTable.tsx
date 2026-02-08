import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface ILaundryItem {
  id: string;
  staff: string;
  category: string;
  name: string;
  isActive: boolean;
}

export const LaundryItemsTable = () => {
  const [filter, setFilter] = useState({
    search: '',
  });

  const data: ILaundryItem[] = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: String(index + 1),
      staff: 'Айдаров С.',
      category: 'Полотенце',
      name: '1 час',
      isActive: true,
    }));

  const columns: ColumnsType<ILaundryItem> = [
    {
      title: 'Клининг персонал',
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Активные',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Switch
          checked={isActive}
          style={{ backgroundColor: isActive ? '#00B368' : undefined }}
        />
      ),
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
              fontWeight: 500,
            }}
          >
            <span style={{ textDecoration: 'underline' }}>Изменить</span>
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
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button
          style={{
            height: '40px',
            borderRadius: '20px',
            borderColor: '#2563EB',
            color: '#2563EB',
            padding: '0 20px',
          }}
        >
          Активные
        </Button>
        <Select
          placeholder='Категория'
          style={{ width: 140, height: 40 }}
          options={[]}
          allowClear
        />
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
