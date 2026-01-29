import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IFloor {
  id: string;
  enclosure: string;
  floor: number;
}

export const FloorsTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    enclosure: undefined,
  });

  const data: IFloor[] = [
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 7 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 4 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 2 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 6 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 12 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 5 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 5 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 6 },
    { id: 'INV-1001', enclosure: 'INV-1001', floor: 11 },
  ];

  const columns: ColumnsType<IFloor> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Корпус',
      dataIndex: 'enclosure',
      key: 'enclosure',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
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
          placeholder='Корпус'
          style={{ width: 120, height: 40 }}
          onChange={(value) => setFilter({ ...filter, enclosure: value })}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
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
