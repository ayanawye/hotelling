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
  type IFinancePaymentType,
  type PaymentType,
  useDeleteFinancePaymentTypeMutation,
  useGetFinancePaymentTypesQuery,
} from '@entities/finance';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';
import { Alert, message } from 'antd';
import { getErrorMessage, PAYMENT_TYPE, PaymentTypeOptions } from '@shared/lib';
import clsx from 'clsx';

import s from './PaymentTypesTable.module.scss';

export const PaymentTypesTable = () => {
  const navigation = useNavigate();

  const [filter, setFilter] = useState({
    search: '',
    type: '',
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<IFinancePaymentType | null>(null);

  const { data, isLoading, isError } = useGetFinancePaymentTypesQuery(filter);
  const [deleteFinancePaymentType, { isLoading: deleteLoading }] =
    useDeleteFinancePaymentTypeMutation();

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
      render: (type: PaymentType) => PAYMENT_TYPE[type],
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
    <div className={clsx(s.filter, 'table-header')}>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <div className='table-header-filter'>
        <SelectWithSearch
          allowClear
          placeholder={'Тип оплаты'}
          onChange={(value) => setFilter({ ...filter, type: value })}
          options={PaymentTypeOptions}
        />
        <Button variant='primary' onClick={() => navigation('create')}>
          Создать
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки типов оплат' type='error' />;
  }

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
