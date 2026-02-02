import { BottomArrowIcon, SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, message, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  ROOMS_COLOR_CONFIG,
  useDeleteHotelRoomsTypeMutation,
  useGetHotelRoomsTypesQuery,
} from '@entities/rooms';
import type { IRoomType, RoomsColor } from '@entities/rooms/types';
import { TableActions } from '@widgets/TableActions';

import s from './RoomTypesTable.module.scss';

export const RoomTypesTable = () => {
  const { bookingStatusTagStyle } = useStyles();

  const { data } = useGetHotelRoomsTypesQuery();
  const [deleteHotelRoomsType, { isLoading }] =
    useDeleteHotelRoomsTypeMutation();

  const [filter, setFilter] = useState<{
    search: string;
    color: string[] | null;
  }>({
    search: '',
    color: [],
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<IRoomType | null>(null);

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
          editLink='edit'
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
        <Select
          mode='multiple'
          maxTagCount={'responsive'}
          allowClear
          suffixIcon={<BottomArrowIcon />}
          className={s.filter}
          placeholder='Цвет типа номера'
          defaultValue={['a10', 'c12']}
          onChange={(value) => setFilter({ ...filter, color: value })}
          options={Object.entries(ROOMS_COLOR_CONFIG).map(([key, config]) => ({
            value: key,
            label: config.label,
          }))}
        />
        <Button
          type='primary'
          onClick={() => {}}
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
      </div>
    </div>
  );

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data as unknown as IRoomType[]}
        columns={columns}
        loading={false}
        rowKey='id'
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить тип номера?'
        isLoading={isLoading}
        description={`Тип номера "${selectedType?.name}" будет удален из системы.`}
      />
    </>
  );
};
