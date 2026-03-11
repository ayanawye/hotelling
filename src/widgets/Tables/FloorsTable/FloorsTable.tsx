import { SearchIcon } from '@shared/assets';
import {
  Button,
  DeleteModal,
  InputTextField,
  PageLoader,
  SelectWithSearch,
} from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  useDeleteHotelFloorMutation,
  useGetHotelEnclosuresQuery,
  useGetHotelFloorsQuery,
} from '@entities/rooms';
import type { IHotelFloor } from '@entities/rooms/types';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';
import { Alert, message } from 'antd';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { useDebounce } from '@shared/hooks/useDebounce.ts';

export const FloorsTable = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    search: '',
    enclosure: undefined,
  });
  const debouncedSearch = useDebounce(filter.search, 500);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<IHotelFloor | null>(null);

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetHotelFloorsQuery({
    search: debouncedSearch,
    hull_id: filter.enclosure,
  });
  const { data: allHulls } = useGetHotelEnclosuresQuery();
  const [deleteHotelFloor, { isLoading }] = useDeleteHotelFloorMutation();

  const handleDelete = async () => {
    try {
      await deleteHotelFloor(selectedFloor?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IHotelFloor> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Корпус',
      dataIndex: 'enclosure',
      key: 'enclosure',
      render: (_, record) => record.hull?.name || '-',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedFloor}
          setDeleteModalOpen={setDeleteModalOpen}
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
        <SelectWithSearch
          placeholder='Корпус'
          allowClear
          maxTagPlaceholder={() => 'Цвет статуса номера'}
          onChange={(value) => setFilter({ ...filter, enclosure: value })}
          options={mapToOptions(allHulls)}
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          <span>Создать</span>
        </Button>
      </div>
    </div>
  );

  if (isDataLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={false}
        rowKey='id'
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить этаж?'
        isLoading={isLoading}
        description={`Этаж "${selectedFloor?.floor}" будет удален из системы.`}
      />
    </>
  );
};
