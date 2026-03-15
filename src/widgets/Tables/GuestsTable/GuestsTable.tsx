import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useGetGuestsQuery } from '@entities/guests';
import { GUEST_STATUS, GUESTS_LANGUAGE, GUESTS_TITLE } from '@shared/lib';
import type {
  GuestLanguage,
  GuestTitle,
  IGuest,
  IGuestStatus,
} from '@entities/guests/types';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@shared/hooks/useDebounce.ts';
import {
  FilterComponent,
  type FilterConfig,
} from '@features/FilterComponent/FilterComponent.tsx';

import s from './GuestsTable.module.scss';

export const GuestsTable = () => {
  const { bookingStatusTagStyle } = useStyles();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<{
    search: string;
    status: string[];
    guest_category: string | null;
    language: string | null;
  }>({
    search: '',
    status: [],
    guest_category: null,
    language: null,
  });

  const debouncedSearch = useDebounce(filter.search, 500);

  const { search, ...restFilters } = filter;

  const { data, isLoading, isError } = useGetGuestsQuery({
    search: debouncedSearch,
    ...restFilters,
  });

  const columns: ColumnsType<IGuest> = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key: 'first_name',
      className: 'noWrapColumn',
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key: 'last_name',
      className: 'noWrapColumn',
    },
    {
      title: 'Отчество',
      dataIndex: 'middle_name',
      key: 'middle_name',
      className: 'noWrapColumn',
    },
    {
      title: 'Язык',
      dataIndex: 'language',
      key: 'language',
      className: 'noWrapColumn',
      render: (lang: GuestLanguage) => GUESTS_LANGUAGE[lang],
    },
    {
      title: 'Титул',
      dataIndex: 'title',
      key: 'title',
      className: 'noWrapColumn',
      render: (title: GuestTitle) => GUESTS_TITLE[title],
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phone',
      key: 'phone',
      className: 'noWrapColumn',
    },
    {
      title: 'Гражданство',
      dataIndex: 'citizenship',
      key: 'citizenship',
      className: 'noWrapColumn',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      className: 'noWrapColumn',
      render: (status: IGuestStatus) => (
        <Tag
          style={{
            ...bookingStatusTagStyle,
            background: '#E6F9F0',
            color: '#00B368',
            border: 'none',
          }}
        >
          {GUEST_STATUS[status]}
        </Tag>
      ),
    },
  ];

  const filterConfigs: FilterConfig[] = [
    {
      name: 'language',
      label: 'Выберите язык',
      placeholder: 'Язык',
      options: [
        { label: 'Русский', value: 'ru' },
        { label: 'Английский', value: 'en' },
        { label: 'Немецкий', value: 'de' },
      ],
    },
    {
      name: 'guest_category',
      label: 'Выберите категорию',
      placeholder: 'Категория гостя',
      options: [
        { label: 'Нежелательный', value: 'undesirable' },
        { label: 'Неплательщик', value: 'non_payer' },
        { label: 'Постоянный', value: 'regular' },
      ],
    },
    {
      name: 'status',
      label: 'Выберите статус',
      placeholder: 'Статус гостя',
      options: [
        { label: 'Черновик', value: 'DRAFT' },
        { label: 'Активный', value: 'ACTIVE' },
        { label: 'Архивный', value: 'ARCHIVED' },
      ],
      mode: 'multiple',
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
      <FilterComponent
        initialFilters={{
          language: filter.language,
          guest_category: filter.guest_category,
          status: filter.status,
        }}
        configs={filterConfigs}
        onApply={(newFilters) => setFilter({ ...filter, ...newFilters })}
        onResetAll={() =>
          setFilter({
            ...filter,
            status: [],
            guest_category: null,
            language: null,
          })
        }
      />
    </div>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return (
    <TableComponent
      title={TableHeader}
      data={data?.results}
      tableLayout={'auto'}
      columns={columns}
      loading={isLoading}
      onRow={(record: IGuest) => ({
        onClick: () => navigate(`${record.id}`),
        style: { cursor: 'pointer' },
      })}
    />
  );
};
