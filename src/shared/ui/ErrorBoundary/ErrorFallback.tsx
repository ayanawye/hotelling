import { Button, Result } from 'antd';
import type { FC } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Result
        status='error'
        title='Что-то пошло не так'
        subTitle={
          error.message || 'Произошла непредвиденная ошибка в приложении.'
        }
        extra={[
          <Button
            type='primary'
            key='home'
            onClick={() => window.location.assign('/bookings/board')}
          >
            На главную
          </Button>,
          <Button key='reset' onClick={resetErrorBoundary}>
            Попробовать снова
          </Button>,
        ]}
      />
    </div>
  );
};
