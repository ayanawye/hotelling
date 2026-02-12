export const getChangedFields = <T extends Record<string, any>>(
  initial: T,
  current: T,
): Partial<T> | null => {
  const result: Partial<T> = {};

  Object.keys(current).forEach((key) => {
    const initialValue = initial[key];
    const currentValue = current[key];

    if (
      typeof currentValue === 'object' &&
      currentValue !== null &&
      !Array.isArray(currentValue)
    ) {
      const nestedDiff = getChangedFields(initialValue || {}, currentValue);

      if (nestedDiff) {
        result[key as keyof T] = nestedDiff as any;
      }
    } else if (currentValue !== initialValue) {
      result[key as keyof T] = currentValue;
    }
  });

  return Object.keys(result).length ? result : null;
};
