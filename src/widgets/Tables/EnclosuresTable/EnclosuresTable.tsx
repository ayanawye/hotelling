import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface IEnclosure {
  id: string;
  name: string;
}

export const EnclosuresTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const data: IEnclosure[] = Array.from({ length: 9 }).map((_, index) => ({
    id: `INV-100${index + 1}`,
    name: `INV-100${index + 1}`,
  }));

  const columns: ColumnsType<IEnclosure> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: () => (
        <Space size='middle'>
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Удалить
          </Button>
          <Button
            type='text'
            icon={<EditOutlined />}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Изменить
          </Button>
        </Space>
      ),
    },
  ];

  const TableHeader = (
    <div
      style={{
        ...tableHeaderStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
      <Button
        type='primary'
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          borderRadius: '20px',
          padding: '0 24px',
          backgroundColor: '#2B63D9',
        }}
      >
        <span>Создать</span>
      </Button>
    </div>
  );

  return (
    <TableComponent
      title={TableHeader}
      data={data}
      columns={columns}
      loading={false}
      rowKey='id'
    />
  );
};
