import './style/index.css';

import { ThemeProvider } from '@shared/styles/theme/ThemeContext';
import { App } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { createAppRouter } from './router/appRouter';
import { setupStore } from './store/store';

/*
 * - Пока что статик роль (А так данные будем брать с редакса)
 */
const userRole = 'RECEPTIONIST';
const router = createAppRouter(userRole);
const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
