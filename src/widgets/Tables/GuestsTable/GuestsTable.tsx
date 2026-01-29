import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IGuest {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  language: string;
  title: string;
  phone: string;
  citizenship: string;
  status: 'Завершен' | 'В процессе' | 'Отменен';
}

export const GuestsTable = () => {
  const { tableHeaderStyle, bookingStatusTagStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const data: IGuest[] = [
    {
      id: 1,
      firstName: 'Никита',
      lastName: 'Флоров',
      middleName: 'Ильич',
      language: 'Казахстан',
      title: 'Sir',
      phone: '+7 709 234 554',
      citizenship: 'Казахстан',
      status: 'Завершен',
    },
    {
      id: 2,
      firstName: 'Никита',
      lastName: 'Флоров',
      middleName: 'Ильич',
      language: 'Казахстан',
      title: 'Sir',
      phone: '+7 709 234 554',
      citizenship: 'Казахстан',
      status: 'Завершен',
    },
    {
      id: 3,
      firstName: 'Никита',
      lastName: 'Флоров',
      middleName: 'Ильич',
      language: 'Казахстан',
      title: 'Sir',
      phone: '+7 709 234 554',
      citizenship: 'Казахстан',
      status: 'Завершен',
    },
    {
      id: 4,
      firstName: 'Никита',
      lastName: 'Флоров',
      middleName: 'Ильич',
      language: 'Казахстан',
      title: 'Sir',
      phone: '+7 709 234 554',
      citizenship: 'Казахстан',
      status: 'Завершен',
    },
    {
      id: 5,
      firstName: 'Никита',
      lastName: 'Флоров',
      middleName: 'Ильич',
      language: 'Казахстан',
      title: 'Sir',
      phone: '+7 709 234 554',
      citizenship: 'Казахстан',
      status: 'Завершен',
    },
    {
      id: 6,
      firstName: 'Никита',
      lastName: 'Флоров',
      middleName: 'Ильич',
      language: 'Казахстан',
      title: 'Sir',
      phone: '+7 709 234 554',
      citizenship: 'Казахстан',
      status: 'Завершен',
    },
  ];

  const columns: ColumnsType<IGuest> = [
    { title: 'Имя', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Отчество', dataIndex: 'middleName', key: 'middleName' },
    { title: 'Язык', dataIndex: 'language', key: 'language' },
    { title: 'Титул', dataIndex: 'title', key: 'title' },
    { title: 'Номер телефона', dataIndex: 'phone', key: 'phone' },
    { title: 'Гражданство', dataIndex: 'citizenship', key: 'citizenship' },
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
          }}
        >
          {status}
        </Tag>
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
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '40px',
          borderRadius: '20px',
        }}
      >
        <span>Filter</span>
      </Button>
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
