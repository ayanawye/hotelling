export const getErrorMessage = (error: any): string => {
  if (!error) return 'Произошла неизвестная ошибка';

  const errorData = error.data || error;

  if (typeof errorData === 'string') {
    return errorData;
  }

  if (typeof errorData === 'object' && errorData !== null) {
    if (errorData.errors && typeof errorData.errors === 'object') {
      for (const key in errorData.errors) {
        const fieldErrors = errorData.errors[key];

        if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
          const firstError = fieldErrors[0];

          if (typeof firstError === 'string') {
            return firstError;
          }

          if (
            typeof firstError === 'object' &&
            firstError !== null &&
            firstError.message
          ) {
            return firstError.message;
          }
        }
      }
    }

    if (typeof errorData.message === 'string') {
      return errorData.message;
    }

    if (typeof errorData.error === 'string') {
      return errorData.error;
    }
  }

  return error.message || 'Произошла ошибка при выполнении операции';
};
