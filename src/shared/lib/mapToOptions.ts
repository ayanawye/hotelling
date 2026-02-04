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
): SelectOption[] => {
  return (
    data?.map((item) => ({
      label: String(item.name || item.description || ''),
      value: item.id ?? '',
    })) || []
  );
};
