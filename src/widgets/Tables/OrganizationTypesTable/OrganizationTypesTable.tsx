import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
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
import { useDebounce } from '@shared/hooks/useDebounce.ts';

export const OrganizationTypesTable = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrgType, setSelectedOrgType] =
    useState<IOrganizationType | null>(null);

  const { data } = useGetOrganizationTypesQuery(debouncedSearch);
  const [deleteOrganizationType, { isLoading }] =
    useDeleteOrganizationTypeMutation();

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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <Button variant='primary' onClick={() => navigate('create')}>
        Создать
      </Button>
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
