import { SearchIcon } from '@shared/assets';
import {
  Button,
  DeleteModal,
  InputTextField,
  SelectWithSearch,
} from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IOrganizationType,
  useDeleteOrganizationTypeMutation,
  useGetOrganizationTypesQuery,
} from '@entities/organizations';
import { TableActions } from '@widgets/TableActions';
import { message } from 'antd';
import { getErrorMessage } from '@shared/lib';
import { useNavigate } from 'react-router-dom';

export const OrganizationTypesTable = () => {
  const navigate = useNavigate();
  const { data } = useGetOrganizationTypesQuery();
  const [deleteOrganizationType, { isLoading }] =
    useDeleteOrganizationTypeMutation();
  const [filter, setFilter] = useState({
    search: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrgType, setSelectedOrgType] =
    useState<IOrganizationType | null>(null);

  const handleDelete = async () => {
    try {
      await deleteOrganizationType(selectedOrgType?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IOrganizationType> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedOrgType}
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
        title='Удалить тип организации?'
        isLoading={isLoading}
        description={`Тип организации "${selectedOrgType?.name}" будет удален из системы.`}
      />
    </>
  );
};
