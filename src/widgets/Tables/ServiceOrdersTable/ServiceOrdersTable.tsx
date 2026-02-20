import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteServiceOrderMutation, useGetServiceOrdersQuery, } from '@entities/services';
import { getErrorMessage } from '@shared/lib';
import { TableActions } from '@widgets/TableActions';
import type { IServiceOrder } from '@entities/services/types';

export const ServiceOrdersTable = () => {
  const navigate = useNavigate();

  const { data } = useGetServiceOrdersQuery();
  const [deleteServiceOrder, { isLoading }] = useDeleteServiceOrderMutation();

  const [filter, setFilter] = useState({
    search: '',
    select: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedServiceOrder, setSelectedServiceOrder] =
    useState<IServiceOrder | null>(null);

  const handleDelete = async () => {
    try {
      await deleteServiceOrder(selectedServiceOrder?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IServiceOrder> = [
    {
      title: 'Гость',
      dataIndex: 'guest_name',
      key: 'guest_name',
    },
    {
      title: 'Бронирование',
      dataIndex: 'reservation_id',
      key: 'reservation_id',
    },
    {
      title: 'Услуга',
      dataIndex: 'service_name',
      key: 'service_name',
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Цена за ед.',
      dataIndex: 'unit_amount',
      key: 'unit_amount',
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Смена',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          setSelectedItem={setSelectedServiceOrder}
          record={record}
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
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[]}
          onChange={(value) => setFilter({ ...filter, select: value })}
          allowClear
        />
        <Button variant='primary' onClick={() => navigate('create')}>
          <span>Создать</span>
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
        onDelete={handleDelete}
        title='Удалить заказ услуги?'
        isLoading={isLoading}
        description={`Заказ "${selectedServiceOrder?.description}" будет удалена из системы.`}
      />
    </>
  );
};
