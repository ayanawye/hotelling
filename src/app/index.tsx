import './style/index.css';
import {
  authSelector,
  setCredentials,
  setToken,
} from '@entities/user/model/slice';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { ThemeProvider } from '@shared/styles/theme/ThemeContext';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary/ErrorBoundary';
import { App, ConfigProvider, Spin } from 'antd';
import { StrictMode, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { createAppRouter } from './router/appRouter';
import type { UserRole } from './router/config/types';
import { setupStore } from './store/store';
import { Token } from '@shared/hooks/token.ts';
import { useLazyGetMeQuery } from '@entities/user/api/authApi.ts';

const store = setupStore();

// eslint-disable-next-line react-refresh/only-export-components
const AppContent = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token } = useAppSelector(authSelector);
  const [triggerGetMe, { isFetching }] = useLazyGetMeQuery();

  useEffect(() => {
    const tokenLocal = Token.getToken();
    const initAuth = async () => {
      if (tokenLocal && !user) {
        try {
          const userData = await triggerGetMe().unwrap();
          dispatch(setCredentials({ user: userData }));
          dispatch(setToken(tokenLocal));
        } catch (error) {
          // dispatch(logout());
        }
      }
    };

    initAuth();
  }, []);

  const userRole = (user?.role as UserRole) || 'RECEPTIONIST';
  const router = useMemo(
    () => createAppRouter(userRole, !isAuthenticated),
    [userRole, isAuthenticated],
  );

  if (token && !user && isFetching) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Spin size='large' />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <App>
            <AppContent />
          </App>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
