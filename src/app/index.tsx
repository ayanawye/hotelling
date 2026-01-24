import './style/index.css';

import { ThemeProvider } from '@shared/styles/theme/ThemeContext';
import { App } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { createAppRouter } from './router/appRouter';

/*
 * - Пока что статик роль (А так данные будем брать с редакса)
 */
const userRole = 'RECEPTIONIST';
const router = createAppRouter(userRole);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </ThemeProvider>
  </StrictMode>,
);
