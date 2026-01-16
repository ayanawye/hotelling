import 'overlayscrollbars/overlayscrollbars.css';

import { navigationConfig, type NavItem } from '@app/router/config/navigation';
import type { UserRole } from '@app/router/config/types';
import { LogoIcon } from '@shared/assets';
import { Layout, Menu, type MenuProps } from 'antd';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useStyles } from './styled.ts';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    layoutStyle,
    siderStyle,
    logoStyle,
    headerStyle,
    headerTitleStyle,
    headerRightStyle,
    contentWrapperStyle,
    scrollbarStyle,
    contentStyle,
    menuStyle,
  } = useStyles();

  // В будущем будем получать роль из стора
  const userRole: UserRole = 'RECEPTIONIST';

  const menuItems = useMemo(() => {
    const filterAndMap = (items: NavItem[]): MenuItem[] => {
      return items
        .filter((item) => {
          if (!item.access) return true;
          return item.access.includes(userRole);
        })
        .map((item) => {
          const mappedItem: MenuItem = {
            key: item.path || item.key,
            label: item.label,
            icon: item.icon,
          };

          if (item.children) {
            return {
              ...mappedItem,
              children: filterAndMap(item.children),
            };
          }

          return mappedItem;
        });
    };

    return filterAndMap(navigationConfig);
  }, [userRole]);

  // Находим родительский ключ для раскрытия меню, если мы на дочерней странице
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const defaultOpenKeys = useMemo(() => {
    for (const item of navigationConfig) {
      if (item.children?.some((child) => child.path === location.pathname)) {
        return [item.key];
      }
    }
    return [];
  }, [location.pathname]);

  useEffect(() => {
    navigate('/bookings/board');
  }, []);

  return (
    <Layout style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={siderStyle}
        theme='light'
      >
        <div style={logoStyle}>
          {!collapsed && <LogoIcon />}
          {collapsed ? 'H' : 'Hotelling'}
        </div>
        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[location.pathname]}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={menuStyle}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <h4 style={headerTitleStyle}>Панель управления</h4>
          <div style={headerRightStyle}>
            <span>{userRole}</span>
          </div>
        </Header>
        <Content style={contentWrapperStyle}>
          <OverlayScrollbarsComponent
            options={{
              scrollbars: {
                autoHide: 'never',
                theme: 'os-theme-custom',
              },
            }}
            style={scrollbarStyle}
            defer
          >
            <div style={contentStyle}>
              <Outlet />
            </div>
          </OverlayScrollbarsComponent>
        </Content>
      </Layout>
    </Layout>
  );
};
