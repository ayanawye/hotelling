import 'overlayscrollbars/overlayscrollbars.css';

import {
  navigationConfig,
  type NavItem,
} from '@app/router/config/navigation.tsx';
import type { UserRole } from '@app/router/config/types';
import { logout } from '@entities/user/model/slice';
import * as Icons from '@shared/assets';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { useStyles } from '@shared/styles';
import { useTheme } from '@shared/styles/theme/useTheme';
import { Breadcrumbs } from '@shared/ui';
import { Button, Layout, Menu, type MenuProps, Switch } from 'antd';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    layoutStyle,
    siderStyle,
    logoStyle,
    headerStyle,
    headerRightStyle,
    contentWrapperStyle,
    scrollbarStyle,
    contentStyle,
    menuStyle,
    themeSwitchStyle,
  } = useStyles();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userRole: UserRole = user?.role || 'RECEPTIONIST';

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
            icon: item.icon ? item.icon : null,
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
    if (location.pathname === '/') {
      navigate('/bookings/board');
    }
  }, [location.pathname, navigate]);

  return (
    <Layout style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={siderStyle}
      >
        <div style={logoStyle}>
          {!collapsed && <Icons.LogoIcon />}
          {collapsed ? 'H' : 'Hotelling'}
        </div>
        <Menu
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
          <Breadcrumbs />
          <div style={headerRightStyle}>
            <Switch
              checkedChildren='Dark'
              unCheckedChildren='Light'
              checked={theme === 'dark'}
              onChange={toggleTheme}
              style={themeSwitchStyle}
            />
            <span style={{ marginRight: 16 }}>
              {user?.username} ({userRole})
            </span>
            <Button onClick={handleLogout} type='link' danger>
              Выйти
            </Button>
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
