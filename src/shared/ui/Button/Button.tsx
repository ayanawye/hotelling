import type { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';

import s from './Button.module.scss';
import { Spin } from 'antd';

interface Props {
  children?: ReactNode;
  variant:
    | 'primary'
    | 'primary_big'
    | 'secondary'
    | 'no-style'
    | 'none'
    | 'outlined_modal'
    | 'outlined_big'
    | 'outlined_danger'
    | 'danger_modal';
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  icon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button: FC<Props> = (props) => {
  const {
    children,
    onClick,
    htmlType,
    className,
    icon,
    style,
    disabled,
    variant,
    isLoading,
  } = props;

  return (
    <button
      style={style}
      className={clsx(s.button, s[`button_${variant}`], className, {
        [s.button_disable]: disabled,
      })}
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && <Spin size='large' />}
      {children}
      {icon}
    </button>
  );
};
