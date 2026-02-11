import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { TableActions } from '@widgets/TableActions';

interface IWashings {
  id: string;
  staff: string;
  item: string;
  status: 'Завершен' | 'В процессе' | 'Отменен';
  quantity: number;
  duration: string;
  consumables: string;
}

export const WashingsTable = () => {
  const { bookingStatusTagStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWashing, setSelectedWashing] = useState<IWashings | null>(
    null,
  );

  const data: IWashings[] = Array(9)
    .fill({
      id: '1246377',
      staff: 'Айдаров С.',
      item: 'Полотенце',
      status: 'Завершен',
      quantity: 12,
      duration: '1 час',
      consumables: 'Порошок · 5 кг',
    })
    .map((item, index) => ({ ...item, key: index }));

  const columns: ColumnsType<IWashings> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Персонал',
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: 'Предмет',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          style={{
            ...bookingStatusTagStyle,
            background: '#E6F9F0',
            color: '#00B368',
            border: 'none',
            borderRadius: '12px',
            padding: '2px 12px',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Длительность',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Расходники',
      dataIndex: 'consumables',
      key: 'consumables',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setDeleteModalOpen={setDeleteModalOpen}
          setSelectedItem={setSelectedWashing}
        />
      ),
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
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '40px',
            borderRadius: '20px',
            padding: '0 20px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='4' y1='21' x2='4' y2='14'></line>
              <line x1='4' y1='10' x2='4' y2='3'></line>
              <line x1='12' y1='21' x2='12' y2='12'></line>
              <line x1='12' y1='8' x2='12' y2='3'></line>
              <line x1='20' y1='21' x2='20' y2='16'></line>
              <line x1='20' y1='12' x2='20' y2='3'></line>
              <line x1='2' y1='14' x2='6' y2='14'></line>
              <line x1='10' y1='8' x2='14' y2='8'></line>
              <line x1='18' y1='16' x2='22' y2='16'></line>
            </svg>
            Filter
          </span>
        </Button>
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
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={false}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => {
          setDeleteModalOpen(false);
        }}
        title='Удалить запись?'
        description='Запись о стирке будет удалена из системы.'
      />
    </>
  );
};
