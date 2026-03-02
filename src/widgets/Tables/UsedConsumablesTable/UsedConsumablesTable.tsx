import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IConsumableUsage,
  useDeleteConsumableUsageMutation,
  useGetConsumableUsagesQuery,
} from '@entities/consumable';
import { TableActions } from '@widgets/TableActions';
import { getErrorMessage } from '@shared/lib';
import { useNavigate } from 'react-router-dom';

export const UsedConsumablesTable = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetConsumableUsagesQuery();
  const [deleteConsumableUsage, { isLoading: isDeleting }] =
    useDeleteConsumableUsageMutation();

  const [filter, setFilter] = useState({
    search: '',
    select: undefined,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IConsumableUsage | null>(
    null,
  );

  const handleDelete = async () => {
    try {
      if (selectedItem?.id) {
        await deleteConsumableUsage(selectedItem.id).unwrap();
        message.success('Использованный расходник успешно удален');
      }
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IConsumableUsage> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Номер',
      dataIndex: 'consumable_id',
      key: 'consumable_id',
    },
    {
      title: 'Расходник',
      dataIndex: ['consumable', 'name'],
      key: 'consumable_name',
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Добавил',
      dataIndex: 'user',
      key: 'user',
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
        loading={isLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить использованный расходник?'
        isLoading={isDeleting}
        description={`Использованный расходник будет удален из системы.`}
      />
    </>
  );
};
