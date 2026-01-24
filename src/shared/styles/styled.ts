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
    color: token.colorText,
    background: token.colorBgLayout,
    overflow: 'hidden',
  };

  const headerStyle: CSSProperties = {
    padding: '24px 22px',
    background: token.colorBgLayout,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
  };

  const siderStyle: CSSProperties = {
    boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
    zIndex: 10,
    background: '#fff',
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
    background: token.colorBgLayout,
    position: 'relative',
    display: 'flex',
    border: 'none',
  };

  const scrollbarStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    paddingRight: '15px',
  };

  const contentStyle: CSSProperties = {
    borderRadius: token.borderRadiusLG,
    border: `1px solid #E5E5E5`,
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
    color: token.colorText,
    background: token.colorBgContainer,
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

  const tableStyles: CSSProperties = {
    borderRadius: '24px',
    overflow: 'hidden', // Чтобы скругления работали
    border: `1px solid ${token.colorBorderSecondary}`,
    background: token.colorBgContainer,
  };

  const tableHeaderStyle: CSSProperties = {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16,
  };

  const tableSearchStyle: CSSProperties = {
    width: 300,
  };

  const tableThemeConfig = {
    headerBg: 'transparent',
    headerColor: '#8C8C8C', // Цвет текста заголовка как на скрине
    borderRadius: 24,
    cellPaddingBlock: 16, // Увеличим отступы ячеек
    cellPaddingInline: 24,
    headerSplitColor: 'transparent', // Убираем разделители в заголовке
    borderColor: token.colorBorderSecondary, // Цвет границ внутри таблицы
    titlePadding: '16px 24px', // Отступы для заголовка (где будет поиск и фильтры)
    footerPadding: '16px 24px', // Отступы для футера
  };

  const emptyStyles: CSSProperties = {
    height: 100,
  };

  const pageLoaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    minHeight: '200px',
  };

  const restrictedStyle: CSSProperties = {
    padding: '20px',
    textAlign: 'center',
  };

  const themeSwitchStyle: CSSProperties = {
    marginRight: 16,
  };

  const fullWidthStyle: CSSProperties = {
    width: '100%',
  };

  const marginBottomStyle: CSSProperties = {
    marginBottom: 24,
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
    tableStyles,
    tableHeaderStyle,
    tableSearchStyle,
    tableThemeConfig,
    emptyStyles,
    pageLoaderStyle,
    restrictedStyle,
    themeSwitchStyle,
    fullWidthStyle,
    marginBottomStyle,
  };
};
