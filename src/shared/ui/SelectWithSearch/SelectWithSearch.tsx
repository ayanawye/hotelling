import { Divider, Input, Select, type SelectProps } from 'antd';
import { useMemo, useState } from 'react';
import { SearchIcon } from '@shared/assets';
import s from './SelectWithSearch.module.scss';

interface SelectWithSearchProps extends SelectProps {
  searchPlaceholder?: string;
}

export const SelectWithSearch = (props: SelectWithSearchProps) => {
  const {
    dropdownRender,
    options = [],
    searchPlaceholder = 'Search',
    ...restProps
  } = props;
  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) => {
      // Пытаемся найти строку для поиска.
      // Если label - ReactNode, ищем в value или в label, если это строка.
      const labelText = typeof option.label === 'string' ? option.label : '';
      const valueText = option.value?.toString() || '';

      // В нашем случае для RoomTypesTable мы можем использовать value или передавать текст поиска отдельно
      // Но для универсальности проверим и то и другое
      return (
        labelText.toLowerCase().includes(searchValue.toLowerCase()) ||
        valueText.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [options, searchValue]);

  return (
    <Select
      {...restProps}
      options={filteredOptions}
      showSearch={false}
      className={s.filter}
      onDropdownVisibleChange={(visible) => {
        if (!visible) setSearchValue('');
      }}
      dropdownRender={(menu) => (
        <div className={s.dropdownWrapper}>
          <div className={s.searchWrapper}>
            <Input
              placeholder={searchPlaceholder}
              prefix={<SearchIcon />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={s.searchInput}
              variant='outlined'
              allowClear
            />
          </div>
          <Divider style={{ margin: '8px 0' }} />
          {menu}
        </div>
      )}
    />
  );
};
