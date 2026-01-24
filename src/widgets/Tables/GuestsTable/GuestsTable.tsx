import { SearchIcon } from '@shared/assets';
import { useStyles } from '@shared/styles';
import { InputTextField } from '@shared/ui';
import { TableComponent } from '@widgets/TableComponent';
import { Space } from 'antd';
import { useState } from 'react';

export const GuestsTable = () => {
  const { tableHeaderStyle } = useStyles();

  const [filter, setFilter] = useState({
    search: '',
  });

  const data = [
    { id: 1, title: 'Guest 1', comment: 'comment 1' },
    { id: 2, title: 'Guest 2', comment: 'comment 2' },
    { id: 3, title: 'Guest 3', comment: 'comment 3' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
  ];

  const TableHeader = (
    <Space style={tableHeaderStyle}>
      <InputTextField
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder='Поиск'
        prefixIcon={<SearchIcon />}
      />
    </Space>
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
