import { type SelectOption } from '@shared/types';

interface MapToOptionsItem {
  id?: string | number;
  name?: string | number;
  description?: string | number;
  [key: string]: any;
}

/**
 * Универсальная функция для преобразования массива объектов в массив опций для Select
 * @param data - массив объектов для преобразования
 * @returns массив опций { label, value }
 */
export const mapToOptions = (
  data: MapToOptionsItem[] | undefined,
  labelKey: string = 'name',
): SelectOption[] => {
  return (
    data?.map((item) => ({
      label: String(
        item[labelKey] ||
          item.name ||
          item.description ||
          (item.first_name && `${item.first_name} ${item.last_name}`) ||
          (item.room && `Комната №: ${item.room}`) ||
          item.full_name,
      ),
      value: item.id ?? '',
    })) || []
  );
};
