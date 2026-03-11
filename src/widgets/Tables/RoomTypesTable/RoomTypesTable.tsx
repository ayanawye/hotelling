import { BottomArrowIcon, SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import {
  Button,
  DeleteModal,
  InputTextField,
  PageLoader,
  SelectWithSearch,
} from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  ROOMS_COLOR_CONFIG,
  useDeleteHotelRoomsTypeMutation,
  useGetHotelRoomsTypesQuery,
} from '@entities/rooms';
import type { IRoomType, RoomsColor } from '@entities/rooms/types';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';

import s from './RoomTypesTable.module.scss';
import { useDebounce } from '@shared/hooks/useDebounce.ts';
import clsx from 'clsx';

export const RoomTypesTable = () => {
  const { bookingStatusTagStyle } = useStyles();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<{
    search: string;
    color: string;
  }>({
    search: '',
    color: '',
  });
  const debouncedSearch = useDebounce(filter.search, 500);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<IRoomType | null>(null);

  const { data, isLoading, isError } = useGetHotelRoomsTypesQuery({
    search: debouncedSearch,
    color: filter.color,
  });

  const [deleteHotelRoomsType, { isLoading: isUpdate }] =
    useDeleteHotelRoomsTypeMutation();

  const handleDelete = async () => {
    try {
      await deleteHotelRoomsType(selectedType?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error('Удаление невозможно');
    }
  };

  const columns: ColumnsType<IRoomType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '11%',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      width: '14%',
    },
    {
      title: 'Цвет типа номера',
      dataIndex: 'color',
      key: 'color',
      width: '20%',
      render: (color: RoomsColor, record) => {
        const config = ROOMS_COLOR_CONFIG[color];
        return (
          <Tag
            style={{
              ...bookingStatusTagStyle,
              color: config.color,
              backgroundColor: config.backgroundColor,
            }}
          >
            {record.name}
          </Tag>
        );
      },
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '20%',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedType}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      ),
    },
  ];

  const TableHeader = (
    <div className={clsx(s.filter, 'table-header')}>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <div className='table-header-filter'>
        <SelectWithSearch
          allowClear
          suffixIcon={<BottomArrowIcon />}
          className={s.filter}
          placeholder='Цвет типа номера'
          onChange={(value) => setFilter({ ...filter, color: value })}
          options={Object.entries(ROOMS_COLOR_CONFIG).map(([key, config]) => ({
            value: key,
            label: (
              <div className={s.optionWrapper}>
                <div
                  className={s.colorDot}
                  style={{ backgroundColor: config.backgroundColor }}
                />
                <span className={s.label}>{config.label}</span>
              </div>
            ),
          }))}
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          <span>Создать</span>
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data as unknown as IRoomType[]}
        columns={columns}
        loading={isLoading || isUpdate}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить тип номера?'
        isLoading={isUpdate}
        description={`Тип номера "${selectedType?.name}" будет удален из системы.`}
      />
    </>
  );
};
