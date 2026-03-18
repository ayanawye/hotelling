import { SearchIcon } from '@shared/assets';
import { Button, DeleteModal, InputTextField, PageLoader } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Alert, message, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import {
  type IFinanceTax,
  useDeleteFinanceTaxMutation,
  useGetFinanceTaxesQuery,
  usePatchFinanceTaxMutation,
} from '@entities/finance';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@shared/lib';
import { useDebounce } from '@shared/hooks/useDebounce.ts';

export const TaxesTable = () => {
  const navigation = useNavigate();

  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState<IFinanceTax | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetFinanceTaxesQuery({ search: debouncedSearch, status: checked });
  const [patchTax, { isLoading: patchLoading }] = usePatchFinanceTaxMutation();
  const [deleteFinanceTax, { isLoading }] = useDeleteFinanceTaxMutation();

  const handleDelete = async () => {
    try {
      await deleteFinanceTax(selectedTax?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const handleUpdate = async (id: number, checked: boolean) => {
    try {
      await patchTax({ id: id, status: checked }).unwrap();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const columns: ColumnsType<IFinanceTax> = [
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      width: '12%',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Процент',
      dataIndex: 'percent',
      key: 'percent',
      width: '13%',
    },
    {
      title: 'Включить в стоимость',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (checked) => (
        <Switch
          checked={checked}
          onChange={(checked) => handleUpdate(selectedTax?.id || 1, checked)}
        />
      ),
    },
    {
      title: 'Примечание',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '20%',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedTax}
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
      <div className='table-header-filter'>
        <Button
          variant={checked ? 'filter_active' : 'filter_unchecked'}
          onClick={() => setChecked((prev) => (prev ? null : true))}
        >
          Включен в стоимость
        </Button>
        <Button variant='primary' onClick={() => navigation('create')}>
          Создать
        </Button>
      </div>
    </div>
  );

  if (isDataLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert title='Ошибка загрузки налогов' type='error' />;
  }

  return (
    <>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        loading={isLoading || patchLoading}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        title='Удалить налог?'
        isLoading={isLoading}
        description={`Налог с номером "${selectedTax?.id}" будет удален из системы.`}
      />
    </>
  );
};
