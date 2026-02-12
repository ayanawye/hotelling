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
  type IFinancePaymentType,
  useDeleteFinancePaymentTypeMutation,
  useGetFinancePaymentTypesQuery,
} from '@entities/finance';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getErrorMessage } from '@shared/lib';

export const PaymentTypesTable = () => {
  const navigation = useNavigate();

  const { data, isLoading } = useGetFinancePaymentTypesQuery();
  const [deleteFinancePaymentType, { isLoading: deleteLoading }] =
    useDeleteFinancePaymentTypeMutation();

  const [filter, setFilter] = useState({
    search: '',
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<IFinancePaymentType | null>(null);

  const handleDelete = async () => {
    try {
      await deleteFinancePaymentType(selectedPaymentType?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IFinancePaymentType> = [
    {
      title: 'Тип оплаты',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Название операции',
      dataIndex: 'operation',
      key: 'operation',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedPaymentType}
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
          placeholder='Тип оплаты'
          maxTagPlaceholder={() => 'Цвет статуса номера'}
          onChange={() => setFilter({ ...filter })}
          options={[{ value: 'INV-1001', label: 'INV-1001' }]}
        />
        <Button variant='primary' onClick={() => navigation('create')}>
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
        loading={isLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить тип оплаты?'
        isLoading={deleteLoading}
        description={`Тип оплаты "${selectedPaymentType?.type}" будет удален из системы.`}
      />
    </>
  );
};
