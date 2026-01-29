import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IRoomType {
  id: string;
  name: string;
  code: string;
  colorType: string;
  description: string;
}

const COLOR_TYPE_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  Люкс: { label: 'Люкс', color: '#00B368', bgColor: '#E6F9F0' },
  Стандарт: { label: 'Стандарт', color: '#D97706', bgColor: '#FEF3C7' },
  Делюкс: { label: 'Делюкс', color: '#E11D48', bgColor: '#FEE2E2' },
};

export const RoomTypesTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    colorType: undefined,
  });

  const data: IRoomType[] = [
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Люкс',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Стандарт',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Делюкс',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Делюкс',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Стандарт',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Делюкс',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Делюкс',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Делюкс',
      description: 'lorem ipsum',
    },
    {
      id: 'INV-1001',
      name: 'INV-1001',
      code: 'INV-1001',
      colorType: 'Делюкс',
      description: 'lorem ipsum',
    },
  ];

  const columns: ColumnsType<IRoomType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Цвет типа номера',
      dataIndex: 'colorType',
      key: 'colorType',
      render: (type: string) => {
        const config = COLOR_TYPE_CONFIG[type] || {
          label: type,
          color: '#000',
          bgColor: '#f0f0f0',
        };
        return (
          <Tag
            style={{
              borderRadius: '20px',
              padding: '2px 16px',
              border: 'none',
              color: config.color,
              backgroundColor: config.bgColor,
              fontWeight: 500,
            }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: () => (
        <Space size='middle'>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Удалить
          </Button>
          <Button
            type='text'
            icon={<EditOutlined />}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Изменить
          </Button>
        </Space>
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
      <Space size='middle'>
        <Select
          placeholder='Цвет типа номера'
          style={{ width: 180, height: 40 }}
          onChange={(value) => setFilter({ ...filter, colorType: value })}
          options={[
            { value: 'Люкс', label: 'Люкс' },
            { value: 'Стандарт', label: 'Стандарт' },
            { value: 'Делюкс', label: 'Делюкс' },
          ]}
        />
        <Button
          type='primary'
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            borderRadius: '20px',
            padding: '0 24px',
            backgroundColor: '#2B63D9',
          }}
        >
          <span>Создать</span>
        </Button>
      </Space>
    </div>
  );

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={false}
      rowKey='id'
    />
  );
};
