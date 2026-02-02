import {
  DeleteIcon,
  EditIcon,
  FilterIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
} from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Dropdown, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useGetGuestsQuery } from '@entities/guests';
import { GUESTS_LANGUAGE, GUESTS_TITLE } from '@shared/lib';
import type { GuestLanguage, GuestTitle, IGuest } from '@entities/guests/types';

import s from './GuestsTable.module.scss';
import clsx from 'clsx';

export const GuestsTable = () => {
  const { bookingStatusTagStyle } = useStyles();
  const { data } = useGetGuestsQuery();

  const [filter, setFilter] = useState({
    search: '',
  });

  const getActionItems = [
    {
      key: 'add-service',
      label: 'Добавить услугу',
      icon: <PlusIcon />,
    },
    {
      key: 'laundry-order',
      label: 'Заказ в прачку',
      icon: <RefreshIcon />,
    },
    {
      key: 'edit',
      label: 'Изменить',
      icon: <EditIcon />,
    },
    {
      key: 'delete',
      label: 'Удалить',
      icon: <DeleteIcon />,
      danger: true,
    },
  ];

  const columns: ColumnsType<IGuest> = [
    { title: 'Имя', dataIndex: 'first_name', key: 'first_name', width: '13%' },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '13%',
    },
    {
      title: 'Отчество',
      dataIndex: 'middle_name',
      key: 'middle_name',
      width: '13%',
    },
    {
      title: 'Язык',
      dataIndex: 'language',
      key: 'language',
      width: '10%',
      render: (lang: GuestLanguage) => GUESTS_LANGUAGE[lang],
    },
    {
      title: 'Титул',
      dataIndex: 'title',
      key: 'title',
      width: '10%',
      render: (title: GuestTitle) => GUESTS_TITLE[title],
    },
    { title: 'Номер телефона', dataIndex: 'phone', key: 'phone', width: '18%' },
    {
      title: 'Гражданство',
      dataIndex: 'citizenship',
      key: 'citizenship',
      width: '11%',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
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
    <div className={clsx(s.tableHeader, 'table-header')}>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <Dropdown
        menu={{ items: getActionItems }}
        placement='bottomRight'
        trigger={['click']}
      >
        <div className={s.dropdown}>
          <FilterIcon /> Фильтр
        </div>
      </Dropdown>
    </div>
  );

  return (
    <TableComponent
      title={TableHeader}
      data={data?.results}
      columns={columns}
      loading={false}
    />
  );
};
