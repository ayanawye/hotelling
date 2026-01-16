import { theme } from 'antd';
import type { CSSProperties } from 'react';

/**
 * используем хук для генерации стилей,
 * чтобы иметь доступ к токенам темы Ant Design.
 */
export const useStyles = () => {
  const { token } = theme.useToken();

  const layoutStyle: CSSProperties = {
    height: '100vh',
    width: '100%',
    background: '#EFEFEF',
    overflow: 'hidden',
  };

  const headerStyle: CSSProperties = {
    padding: '24px 22px',
    background: '#EFEFEF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
  };

  const siderStyle: CSSProperties = {
    boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
    zIndex: 10,
    background: token.colorBgContainer,
    height: '100vh',
    position: 'sticky',
    top: 0,
    left: 0,
    padding: '24px 18px',
    width: '236px',
    maxWidth: '236px',
    minWidth: '236px',
    overflowY: 'scroll',
  };

  const contentWrapperStyle: CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    padding: '0 24px 24px',
    background: '#EFEFEF',
    position: 'relative',
    display: 'flex',
  };

  const scrollbarStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    paddingRight: '15px',
  };

  const contentStyle: CSSProperties = {
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorderSecondary}`,
    background: token.colorBgContainer,
    padding: '24px',
    minHeight: '100%',
  };

  const headerTitleStyle: CSSProperties = {
    fontWeight: '600',
    fontSize: '32px',
    lineHeight: '130%',
  };

  const headerRightStyle: CSSProperties = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  };

  const menuStyle: CSSProperties = {
    borderInlineEnd: 'none',
  };

  const logoStyle: CSSProperties = {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: token.colorPrimary,
    fontSize: '20px',
    fontWeight: 'bold',
    gap: '12px',
    padding: '0 0 8px 12px',
    marginBottom: '72px',
  };

  /**
   * Кастомные стили для Menu antd, чтобы соответствовать дизайну со скриншота.
   * Мы используем глобальные стили через ConfigProvider -> theme -> components
   * или инъекцию через глобальный селектор.
   */
  const menuThemeConfig = {
    itemSelectedBg: token.colorPrimary,
    itemSelectedColor: '#fff',
    itemHoverBg: token.colorPrimaryBg,
    itemActiveBg: token.colorPrimary,
    subMenuItemBg: 'transparent',
  };

  return {
    layoutStyle,
    headerStyle,
    siderStyle,
    contentWrapperStyle,
    scrollbarStyle,
    contentStyle,
    headerTitleStyle,
    headerRightStyle,
    menuStyle,
    logoStyle,
    menuThemeConfig,
  };
};
