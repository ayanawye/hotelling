import { Select, type SelectProps } from 'antd';
import s from './SelectWithSearch.module.scss';
import type { SelectOption } from '@shared/types';
import clsx from 'clsx';

interface SelectWithSearchProps extends Omit<SelectProps, 'options'> {
  options?: SelectOption[] | [];
  searchPlaceholder?: string;
}

export const SelectWithSearch = (props: SelectWithSearchProps) => {
  const { options, size, ...restProps } = props;

  return (
    <Select
      {...restProps}
      showSearch
      options={options}
      className={clsx(s.select, {
        [s.select_big]: size === 'large',
      })}
    />
  );
};
