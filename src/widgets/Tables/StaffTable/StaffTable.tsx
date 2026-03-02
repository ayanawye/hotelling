import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, STAFF_ROLE } from '@shared/lib';
import {
  type IPersonal,
  useDeleteStaffMutation,
  useGetStaffsQuery,
} from '@entities/staff';
import { TableActions } from '@widgets/TableActions';

export const StaffTable = () => {
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetStaffsQuery();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteStaffMutation();

  const [filter, setFilter] = useState({
    search: '',
    role: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPersonal | null>(null);

  const handleDelete = async () => {
    try {
      if (selectedItem?.id) {
        await deleteItem(selectedItem.id).unwrap();
        message.success('Сотрудник успешно удален');
      }
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IPersonal> = [
    {
      title: 'ФИО',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role: keyof typeof STAFF_ROLE) => STAFF_ROLE[role],
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          setSelectedItem={setSelectedItem}
          record={record}
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
          options={[]}
          onChange={(value) => setFilter({ ...filter, role: value })}
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
        loading={isFetching}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить сотрудника?'
        isLoading={isDeleting}
        description={`Сотрудник "${selectedItem?.full_name}" будет удален из системы.`}
      />
    </>
  );
};
