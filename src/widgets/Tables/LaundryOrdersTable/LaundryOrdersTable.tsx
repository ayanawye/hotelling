import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface ILaundryOrder {
  id: string;
  guest: string;
  staff: string;
  item: string;
  count: number;
  duration: string;
  consumable: string;
}

export const LaundryOrdersTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
    category: undefined,
  });

  const data: ILaundryOrder[] = Array(11)
    .fill({
      id: '65432',
      guest: 'Иванов Иван',
      staff: 'Айдаров С.',
      item: 'Полотенце',
      count: 12,
      duration: '1 час',
      consumable: 'Порошок · 5 кг',
    })
    .map((item, index) => ({ ...item, key: index }));

  const columns: ColumnsType<ILaundryOrder> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Гость',
      dataIndex: 'guest',
      key: 'guest',
    },
    {
      title: 'Клининг персонал',
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: 'Предмет',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Кол-во',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Длительность',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Расходник',
      dataIndex: 'consumable',
      key: 'consumable',
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
          placeholder='Категория'
          style={{ width: 140, height: 40 }}
          options={[{ value: 'category1', label: 'Категория 1' }]}
          onChange={(value) => setFilter({ ...filter, category: value })}
          allowClear
          className='custom-select-rounded'
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
