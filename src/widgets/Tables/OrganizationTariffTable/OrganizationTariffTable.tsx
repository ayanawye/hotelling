import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableActions } from '@widgets/TableActions';
import { type IRoomStatus } from '@entities/rooms';
import {
  useDeleteOrganizationTariffMutation,
  useGetOrganizationTariffsQuery,
} from '@entities/tariff';
import type { IOrganizationTariff } from '@entities/tariff/types';

export const OrganizationTariffTable = () => {
  const navigate = useNavigate();
  const { data } = useGetOrganizationTariffsQuery();
  const [deleteTariff, { isLoading }] = useDeleteOrganizationTariffMutation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<IRoomStatus | null>(
    null,
  );
  const [filter, setFilter] = useState({
    search: '',
  });

  const handleDelete = async () => {
    try {
      await deleteTariff(Number(selectedTariff?.id) || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error('Удаление невозможно');
    }
  };

  const columns: ColumnsType<IOrganizationTariff> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип номера',
      width: '190px',
      dataIndex: ['room_type', 'name'],
      key: 'roomType',
      render: (type) => (
        <Tag
          style={{
            background: type === 'Люкс' ? '#E6F9F0' : '#FEE2E2',
            color: type === 'Люкс' ? '#00B368' : '#E11D48',
            border: 'none',
            borderRadius: '12px',
            padding: '2px 12px',
          }}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ручной ввод',
      dataIndex: 'manually',
      key: 'manually',
      render: (checked) => <Switch checked={checked} disabled />,
    },
    {
      title: 'Ранний заезд',
      dataIndex: 'early_check_in',
      key: 'early_check_in',
      render: (_, record) => (
        <p>{record.early_check_in ? record.early_check_in : '-'}</p>
      ),
    },
    {
      title: 'Поздний отъезд',
      dataIndex: 'late_departure',
      key: 'late_departure',
      render: (_, record) => (
        <p>{record.late_departure ? record.late_departure : '-'}</p>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedTariff}
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
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[{ value: 'select', label: 'Select' }]}
        />
        <Button variant='primary' onClick={() => navigate('create')}>
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
        onDelete={handleDelete}
        title='Удалить тариф?'
        isLoading={isLoading}
        description={`Тариф "${selectedTariff?.name}" будет удален из системы.`}
      />
    </>
  );
};
