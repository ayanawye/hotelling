export const getErrorMessage = (error: any): string => {
  if (!error) return 'Произошла неизвестная ошибка';

  const errorData = error.data || error;

  if (typeof errorData === 'string') {
    return errorData;
  }

  if (typeof errorData === 'object' && errorData !== null) {
    if (
      errorData.errors &&
      errorData.errors.detail &&
      Array.isArray(errorData.errors.detail) &&
      errorData.errors.detail.length > 0
    ) {
      const firstDetail = errorData.errors.detail[0];

      if (typeof firstDetail === 'object' && firstDetail.message) {
        return firstDetail.message;
      }

      if (typeof firstDetail === 'string') {
        return firstDetail;
      }
    }

    if (typeof errorData.message === 'string') {
      return errorData.message;
    }

    if (typeof errorData.error === 'string') {
      return errorData.error;
    }

    for (const key in errorData) {
      const fieldError = errorData[key];

      if (Array.isArray(fieldError) && fieldError.length > 0) {
        if (typeof fieldError[0] === 'string') {
          return fieldError[0];
        }
        if (typeof fieldError[0] === 'object' && fieldError[0].message) {
          return fieldError[0].message;
        }
      }

      if (typeof fieldError === 'string') {
        return fieldError;
      }

      if (typeof fieldError === 'object' && fieldError !== null) {
        const deepError = getErrorMessage(fieldError);
        if (deepError !== 'Произошла неизвестная ошибка') {
          return deepError;
        }
      }
    }
  }

  return error.message || 'Произошла ошибка при выполнении операции';
};
