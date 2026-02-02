import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IStaffHistory {
  id: string;
  date: string;
  employee: string;
  action: string;
  object: string;
}

export const StaffHistoryTable = () => {
  const [filter, setFilter] = useState({
    search: '',
    action: undefined,
  });

  const data: IStaffHistory[] = [
    {
      id: 'INV-1001',
      date: '24.12.2024 14:00',
      employee: 'Айдаров С.',
      action: 'Создание бронирования',
      object: 'Бронирование №12345',
    },
    {
      id: 'INV-1001',
      date: '24.12.2024 14:05',
      employee: 'Иванов И.',
      action: 'Изменение статуса',
      object: 'Номер 201',
    },
    {
      id: 'INV-1001',
      date: '24.12.2024 14:10',
      employee: 'Айдаров С.',
      action: 'Добавление услуги',
      object: 'Завтрак (Гость: Петров)',
    },
    {
      id: 'INV-1001',
      date: '24.12.2024 14:15',
      employee: 'Никита Ф.',
      action: 'Удаление записи',
      object: 'Расходник: Мыло',
    },
    {
      id: 'INV-1001',
      date: '24.12.2024 14:20',
      employee: 'Айдаров С.',
      action: 'Вход в систему',
      object: 'IP: 192.168.1.1',
    },
  ];

  const columns: ColumnsType<IStaffHistory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Дата и время',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
    },
    {
      title: 'Действие',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Объект',
      dataIndex: 'object',
      key: 'object',
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
          style={{ width: 200, height: 40 }}
          options={[
            { value: 'create', label: 'Создание' },
            { value: 'update', label: 'Изменение' },
            { value: 'delete', label: 'Удаление' },
          ]}
          onChange={(value) => setFilter({ ...filter, action: value })}
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
