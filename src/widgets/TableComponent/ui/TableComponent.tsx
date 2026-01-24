import { useStyles } from '@shared/styles';
import {
  ConfigProvider,
  Empty,
  Table,
  type TablePaginationConfig,
  type TableProps,
} from 'antd';
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

interface ComponentProps<T> extends Omit<TableProps<T>, 'title' | 'footer'> {
  data: any | undefined;
  columns: any | null;
  scroll?: { x?: string | number; y?: string | number } & {
    scrollToFirstRowOnChange?: boolean;
  };
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) => void;
  size?: SizeType;
  loading: boolean;
  title?: React.ReactNode | (() => React.ReactNode);
  rowClickHandler?: TableProps<T>['onRow'];
  footer?: React.ReactNode | (() => React.ReactNode);
}

export const TableComponent = <T extends object>(props: ComponentProps<T>) => {
  const {
    columns,
    data,
    loading,
    scroll = { x: 950 },
    onChange,
    size,
    title,
    rowClickHandler,
    footer,
  } = props;

  const { tableStyles, tableThemeConfig, emptyStyles } = useStyles();

  const locale = {
    emptyText: (
      <Empty style={emptyStyles} description={<h2>Данные отсутствуют</h2>} />
    ),
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: tableThemeConfig,
        },
      }}
    >
      <Table
        title={
          title
            ? typeof title === 'function'
              ? (title as () => React.ReactNode)
              : () => title
            : undefined
        }
        dataSource={data}
        scroll={scroll}
        columns={columns}
        onRow={(record) => ({
          onClick: () => rowClickHandler && rowClickHandler(record),
        })}
        rowKey='id'
        locale={locale}
        onChange={onChange}
        size={size}
        loading={loading}
        tableLayout='fixed'
        pagination={false}
        style={tableStyles}
        footer={
          footer
            ? typeof footer === 'function'
              ? (footer as () => React.ReactNode)
              : () => footer
            : undefined
        }
      />
    </ConfigProvider>
  );
};
