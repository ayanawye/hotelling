import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IPaymentType {
  id: string;
  paymentType: string;
  code: string;
  operationName: string;
}

export const PaymentTypesTable = () => {
  const [filter, setFilter] = useState({
    search: '',
  });

  const data: IPaymentType[] = [
    {
      id: '1',
      paymentType: 'CASH',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '2',
      paymentType: 'Transfer',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '3',
      paymentType: 'CARD',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '4',
      paymentType: 'Transfer',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '5',
      paymentType: 'Transfer',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '6',
      paymentType: 'CARD',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '7',
      paymentType: 'CARD',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '8',
      paymentType: 'CASH',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
    {
      id: '9',
      paymentType: 'Transfer',
      code: 'INV-1001',
      operationName: 'INV-1001',
    },
  ];

  const columns: ColumnsType<IPaymentType> = [
    {
      title: 'Тип оплаты',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Название операции',
      dataIndex: 'operationName',
      key: 'operationName',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            style={{ display: 'flex', alignItems: 'center', padding: 0 }}
          >
            Удалить
          </Button>
          <Button
            type='text'
            icon={<EditOutlined />}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Изменить
          </Button>
        </div>
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
      <div>
        <Select
          placeholder='Select'
          style={{ width: 120, height: 40 }}
          options={[]}
          allowClear
        />
        <Button
          type='primary'
          style={{
            height: '40px',
            borderRadius: '20px',
            padding: '0 24px',
            backgroundColor: '#2563EB',
          }}
        >
          Создать
        </Button>
      </div>
    </div>
  );

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={false}
    />
  );
};
