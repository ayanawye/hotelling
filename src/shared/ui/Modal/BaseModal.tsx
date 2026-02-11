import { Modal, type ModalProps } from 'antd';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './Modal.module.scss';

interface BaseModalProps extends ModalProps {
  className?: string;
}

export const BaseModal: FC<BaseModalProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <Modal
      centered
      footer={null}
      className={clsx(s.modal, className)}
      {...rest}
    >
      {children}
    </Modal>
  );
};
