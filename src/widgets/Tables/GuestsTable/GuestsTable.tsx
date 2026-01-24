import { useStyles } from '@shared/styles';
import { TableComponent } from '@widgets/TableComponent';
import { Input, Space } from 'antd';

export const GuestsTable = () => {
  const { tableHeaderStyle, tableSearchStyle } = useStyles();
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
      <Input.Search placeholder='Поиск гостей' style={tableSearchStyle} />
    </Space>
  );

  return (
    <div>
      <TableComponent
        title={TableHeader}
        data={data}
        columns={columns}
        rowKey={(record) => record.id}
        loading={false}
      />
    </div>
  );
};
