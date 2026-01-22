import './style/index.css';
import './style/lib.scss';

import { App, ConfigProvider, theme } from 'antd';
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
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#2f66ee', // Приблизил цвет к синему со скриншота
            borderRadius: 8,
            colorBgLayout: '#f5f7fa',
          },
          components: {
            Menu: {
              itemHeight: 40,
              subMenuItemBg: 'transparent',
              itemSelectedBg: '#2f66ee',
              itemSelectedColor: '#ffffff',
              activeBarBorderWidth: 0,
              itemMarginBlock: 4, // Управляем отступами через тему, а не CSS
            },
          },
        }}
      >
        <App>
          <RouterProvider router={router} />
        </App>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
