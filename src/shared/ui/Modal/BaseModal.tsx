import { Modal, type ModalProps, theme } from 'antd';
import type { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import s from './Modal.module.scss';

interface BaseModalProps extends ModalProps {
  className?: string;
}

export const BaseModal: FC<BaseModalProps> = (props) => {
  const { children, className, ...rest } = props;
  const { token } = theme.useToken();

  const dynamicVars = {
    '--text-color': token.colorText,
    '--primary-color': token.colorPrimary,
  } as CSSProperties;

  return (
    <Modal
      centered
      footer={null}
      className={clsx(s.modal, className)}
      style={dynamicVars}
      {...rest}
    >
      {children}
    </Modal>
  );
};
