import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

import s from './Button.module.scss';
import { Spin } from 'antd';

interface Props {
  children?: ReactNode;
  variant:
    | 'primary'
    | 'secondary'
    | 'no-style'
    | 'none'
    | 'outlined_modal'
    | 'danger_modal';
  onClick?: () => void;
  className?: string;
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
    disabled,
    variant,
    isLoading,
  } = props;

  return (
    <button
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
