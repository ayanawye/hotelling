import s from './TableActions.module.scss';
import { type FC, useMemo } from 'react';
import clsx from 'clsx';
import { Button } from '@shared/ui';
import { DeleteRedIcon, EditBlackIcon } from '@shared/assets';
import { useNavigate } from 'react-router-dom';

interface Props {
  record: any;
  readonly?: boolean;
  setSelectedItem?: (data: any) => void;
  setDeleteModalOpen?: (isOpen: boolean) => void;
}

export const TableActions: FC<Props> = ({
  record,
  readonly,
  setSelectedItem,
  setDeleteModalOpen,
}) => {
  const navigate = useNavigate();

  const actions = useMemo(() => {
    const editAction = {
      label: readonly ? 'Детали' : 'Изменить',
      color: 'black',
      icon: <EditBlackIcon />,
      onClick: () => navigate(`${readonly ? '' : 'edit/'}${record.id}`),
    };

    if (readonly) {
      return [editAction];
    }

    return [
      {
        label: 'Удалить',
        color: 'red',
        icon: <DeleteRedIcon />,
        onClick: () => {
          setSelectedItem?.(record);
          setDeleteModalOpen?.(true);
        },
      },
      editAction,
    ];
  }, [record, navigate, setSelectedItem, setDeleteModalOpen, readonly]);

  return (
    <div className={s.actions}>
      {actions.map((action) => (
        <Button
          key={action.label}
          variant='none'
          onClick={action.onClick}
          className={s.action}
        >
          {action.icon}
          <p className={clsx(s.action_label, s[`action_${action.color}`])}>
            {action.label}
          </p>
        </Button>
      ))}
    </div>
  );
};
