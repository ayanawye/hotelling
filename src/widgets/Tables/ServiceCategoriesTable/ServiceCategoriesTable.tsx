import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IServiceCategory {
  id: string;
  name: string;
  parentCategory: string;
  isActive: boolean;
  sortOrder: string;
}

export const ServiceCategoriesTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const data: IServiceCategory[] = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: `INV-100${index + 1}`,
      name: 'Тур Агентство',
      parentCategory: 'INV-1001',
      isActive: index !== 6, // 7-й элемент неактивен на скрине
      sortOrder: 'INV-1001',
    }));

  const columns: ColumnsType<IServiceCategory> = [
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
      title: 'Активна',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Switch
          checked={isActive}
          style={{ backgroundColor: isActive ? '#52C41A' : undefined }}
        />
      ),
    },
    {
      title: 'Порядок сортировки',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
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
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
