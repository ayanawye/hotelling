import { BottomArrowIcon, SearchIcon } from '@shared/assets';
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
  type IOrganization,
  useDeleteOrganizationMutation,
  useGetOrganizationsQuery,
} from '@entities/organizations';
import { TableActions } from '@widgets/TableActions';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getErrorMessage, PAYMENT_TYPE } from '@shared/lib';
import { useDebounce } from '@shared/hooks/useDebounce.ts';
import { ROOMS_COLOR_CONFIG } from '@entities/rooms';
import s from '@widgets/Tables/RoomStatusTable/RoomsStatusTable.module.scss';
import type { PaymentType } from '@entities/finance';

export const OrganizationsTable = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<{ search: string; type_id: string[] }>({
    search: '',
    type_id: [],
  });

  const debouncedSearch = useDebounce(filter.search, 500);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<IOrganization | null>(null);

  const { data } = useGetOrganizationsQuery({
    search: debouncedSearch,
    type_id: filter.type_id,
  });
  const [deleteOrganization, { isLoading }] = useDeleteOrganizationMutation();

  const handleDelete = async () => {
    try {
      await deleteOrganization(selectedOrg?.id || 1).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  console.log(data);

  const columns: ColumnsType<IOrganization> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      className: 'noWrapColumn',
      fixed: 'left',
    },
    {
      title: 'Тип клиента',
      dataIndex: ['organization_type', 'name'],
      key: 'organization_type',
      className: 'noWrapColumn',
    },
    {
      title: 'ИНН',
      dataIndex: 'inn',
      key: 'inn',
      className: 'noWrapColumn',
    },
    {
      title: 'Банк',
      dataIndex: 'bank',
      key: 'bank',
      className: 'noWrapColumn',
    },
    {
      title: 'Расчетные счета',
      dataIndex: 'settlement',
      key: 'account',
      className: 'noWrapColumn',
    },
    {
      title: 'Вид платежа',
      dataIndex: ['payment_type', 'type'],
      key: 'payment_type_name',
      className: 'noWrapColumn',
      render: (type: PaymentType) => PAYMENT_TYPE[type],
    },
    {
      title: 'Цвет брони по умолчанию',
      dataIndex: 'armor_color',
      key: 'armor_color',
      className: 'noWrapColumn',
    },
    {
      title: 'Почта',
      dataIndex: 'gmail',
      key: 'gmail',
      className: 'noWrapColumn',
    },
    {
      title: 'Первый телефон',
      dataIndex: 'first_phone',
      key: 'first_phone',
      className: 'noWrapColumn',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          setSelectedItem={setSelectedOrg}
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
        <SelectWithSearch
          mode='multiple'
          maxTagCount={1}
          allowClear
          size={'large'}
          suffixIcon={<BottomArrowIcon />}
          placeholder='Select'
          onChange={(value) =>
            setFilter({ ...filter, type_id: value as string[] })
          }
          options={Object.entries(ROOMS_COLOR_CONFIG).map(([key, config]) => ({
            value: key,
            label: (
              <div className={s.optionWrapper}>
                <div
                  className={s.colorDot}
                  style={{ backgroundColor: config.backgroundColor }}
                />
                <span className={s.label}>{config.label}</span>
              </div>
            ),
          }))}
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
        tableLayout={'auto'}
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
