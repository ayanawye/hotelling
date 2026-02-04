/**
 * Универсальная функция для получения сообщения об ошибке из ответа API.
 * Обрабатывает различные форматы ошибок, включая вложенные объекты с массивами сообщений.
 */
export const getErrorMessage = (error: any): string => {
  if (!error) return 'Произошла неизвестная ошибка';

  // Обработка данных из RTK Query (обычно в error.data)
  const errorData = error.data || error;

  // Если пришла строка
  if (typeof errorData === 'string') {
    return errorData;
  }

  // Если пришел объект (например, { is_base: ["Ошибка..."], name: ["Поле обязательно"] })
  if (typeof errorData === 'object' && errorData !== null) {
    // Если есть прямое поле message или error
    if (errorData.message && typeof errorData.message === 'string') {
      return errorData.message;
    }
    if (errorData.error && typeof errorData.error === 'string') {
      return errorData.error;
    }

    // Перебираем все ключи объекта
    for (const key in errorData) {
      const fieldError = errorData[key];

      // Если значение - массив, берем первую ошибку
      if (Array.isArray(fieldError) && fieldError.length > 0) {
        return fieldError[0];
      }

      // Если значение - строка
      if (typeof fieldError === 'string') {
        return fieldError;
      }

      // Рекурсивный поиск, если это вложенный объект (на всякий случай)
      if (typeof fieldError === 'object' && fieldError !== null) {
        const deepError = getErrorMessage(fieldError);
        if (deepError !== 'Произошла неизвестная ошибка') {
          return deepError;
        }
      }
    }
  }

  // Стандартное сообщение, если не удалось распознать формат
  return error.message || 'Произошла ошибка при выполнении операции';
};
