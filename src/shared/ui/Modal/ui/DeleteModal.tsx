import type { FC } from 'react';
import { BaseModal } from '../BaseModal';
import { Button } from '../../Button/Button';
import s from './DeleteModal.module.scss';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

export const DeleteModal: FC<DeleteModalProps> = (props) => {
  const { isOpen, onClose, onDelete, title, description, isLoading } = props;

  return (
    <BaseModal open={isOpen} onCancel={onClose} width={400}>
      <div className={s.deleteModal}>
        <div className={s.title}>{title}</div>
        <div className={s.description}>{description}</div>
        <div className={s.actions}>
          <Button
            onClick={onDelete}
            isLoading={isLoading}
            variant='danger_modal'
          >
            Удалить
          </Button>
          <Button variant='outlined_modal' onClick={onClose}>
            Отменить
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
