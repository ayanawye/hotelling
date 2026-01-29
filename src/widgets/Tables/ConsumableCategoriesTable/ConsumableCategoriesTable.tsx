import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IConsumableCategory {
  id: string;
  name: string;
  parentCategory: string;
}

export const ConsumableCategoriesTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    parentCategory: undefined,
  });

  const data: IConsumableCategory[] = [
    { id: '1', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '2', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '3', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '4', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '5', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '6', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '7', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '8', name: 'Тур Агенство', parentCategory: 'INV-1001' },
    { id: '9', name: 'Тур Агенство', parentCategory: 'INV-1001' },
  ];

  const columns: ColumnsType<IConsumableCategory> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Старшая категория',
      dataIndex: 'parentCategory',
      key: 'parentCategory',
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
    <div
      style={{
        ...tableHeaderStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        <InputTextField
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder='Поиск'
          prefixIcon={<SearchIcon />}
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
          onChange={(value) => setFilter({ ...filter, parentCategory: value })}
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
