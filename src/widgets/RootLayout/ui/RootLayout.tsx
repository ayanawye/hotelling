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
import { useMemo, useState } from 'react';
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

  const userRole: UserRole = user?.role || 'RECEPTIONIST';

  const menuItems = useMemo(() => {
    const filterAndMap = (items: NavItem[]): MenuItem[] =>
      items
        .filter(
          (item) =>
            (!item.access || item.access.includes(userRole)) && item.menu,
        )
        .map((item) => {
          const children = item.children
            ? filterAndMap(item.children)
            : undefined;
          return {
            key: item.path || item.key,
            label: item.label,
            icon: item.icon || null,
            children: children && children.length > 0 ? children : undefined,
          };
        });

    return filterAndMap(navigationConfig);
  }, [userRole]);

  // Находим активные ключи и родительские ключи для меню
  const { selectedKeys, openKeys } = useMemo(() => {
    const findKeys = (
      items: NavItem[],
      targetPath: string,
      parents: string[] = [],
      lastVisiblePath?: string,
    ): { selected: string; parents: string[] } | null => {
      const matchPath = (path: string, targetPath: string) => {
        if (!path) return false;
        const cleanPath = path.replace(/:[^\/]+/g, '[^/]+');
        const regex = new RegExp(`^${cleanPath}$`);
        return regex.test(targetPath);
      };

      for (const item of items) {
        const currentVisiblePath =
          item.menu !== false ? item.path : lastVisiblePath;

        if (item.path && matchPath(item.path, targetPath)) {
          return {
            selected: currentVisiblePath || item.path || item.key,
            parents,
          };
        }
        if (item.children) {
          const found = findKeys(
            item.children,
            targetPath,
            [...parents, item.key],
            currentVisiblePath,
          );
          if (found) return found;
        }
      }
      return null;
    };

    const keys = findKeys(navigationConfig, location.pathname);
    return {
      selectedKeys: keys ? [keys.selected] : [],
      openKeys: ['/bookings', ...(keys?.parents || [])].filter(
        Boolean,
      ) as string[],
    };
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     navigate('/bookings/board');
  //   }
  // }, [location.pathname, navigate]);

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
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
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
