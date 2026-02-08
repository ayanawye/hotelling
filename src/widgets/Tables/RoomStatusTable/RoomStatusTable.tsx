import { BottomArrowIcon, SearchIcon } from '@shared/assets';
import { DeleteModal, InputTextField, SelectWithSearch } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  ROOMS_COLOR_CONFIG,
  useDeleteHotelRoomStatusMutation,
  useGetHotelRoomsStatusQuery,
} from '@entities/rooms';
import type { IRoomStatus, RoomsColor } from '@entities/rooms/types';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';

import s from './RoomsStatusTable.module.scss';

export const RoomStatusTable = () => {
  const navigate = useNavigate();
  const { data } = useGetHotelRoomsStatusQuery();
  const [deleteHotelRoomStatus, { isLoading }] =
    useDeleteHotelRoomStatusMutation();

  const [filter, setFilter] = useState<{
    search: string;
    color: string[] | null;
  }>({
    search: '',
    color: [],
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<IRoomStatus | null>(
    null,
  );

  const handleDelete = async () => {
    try {
      await deleteHotelRoomStatus(Number(selectedStatus?.id) || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error('Удаление невозможно');
    }
  };

  const columns: ColumnsType<IRoomStatus> = [
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
      title: 'Цвет статуса',
      dataIndex: 'color',
      key: 'color',
      render: (color: RoomsColor) => {
        const config = ROOMS_COLOR_CONFIG[color] || {
          label: color,
          color: '#000',
          backgroundColor: '#f0f0f0',
        };
        return (
          <Tag
            style={{
              background: config.backgroundColor,
              color: config.color,
              border: 'none',
              borderRadius: '20px',
              padding: '2px 16px',
              fontWeight: 500,
            }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedStatus}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      ),
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
        <SelectWithSearch
          mode='multiple'
          maxTagCount={0}
          maxTagPlaceholder={() => 'Цвет статуса номера'}
          allowClear
          size={'large'}
          suffixIcon={<BottomArrowIcon />}
          placeholder='Цвет статуса номера'
          onChange={(value) =>
            setFilter({ ...filter, color: value as string[] })
          }
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
        <Button
          type='primary'
          onClick={() => navigate('create')}
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
        data={data as unknown as IRoomStatus[]}
        columns={columns}
        loading={false}
        rowKey='id'
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить статус?'
        isLoading={isLoading}
        description={`Статус "${selectedStatus?.name}" будет удален из системы.`}
      />
    </>
  );
};
