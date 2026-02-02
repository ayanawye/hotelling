import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField, SelectWithSearch, } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { type IOrganization, useDeleteOrganizationMutation, useGetOrganizationsQuery, } from '@entities/organizations';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';

export const OrganizationsTable = () => {
  const navigate = useNavigate();

  const { data } = useGetOrganizationsQuery();
  const [deleteOrganization, { isLoading }] = useDeleteOrganizationMutation();

  const [filter, setFilter] = useState({
    search: '',
    type: undefined,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<IOrganization | null>(null);

  const handleDelete = async () => {
    try {
      await deleteOrganization(selectedOrg?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<IOrganization> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип клиента',
      dataIndex: ['organization_type', 'name'],
      key: 'organization_type',
    },
    {
      title: 'ИНН',
      dataIndex: 'inn',
      key: 'inn',
    },
    {
      title: 'Банк',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Расч-ь',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedOrg}
          setDeleteModalOpen={setDeleteModalOpen}
          editLink={'edit'}
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
          placeholder='Search'
          onChange={() => setFilter({ ...filter })}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
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
        title='Удалить организацию?'
        isLoading={isLoading}
        description={`Организация "${selectedOrg?.name}" будет удален из системы.`}
      />
    </>
  );
};
