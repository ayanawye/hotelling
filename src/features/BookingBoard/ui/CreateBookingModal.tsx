import { Modal, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import type { FC } from 'react';

import styles from './CreateBookingModal.module.scss';

const { Text, Title } = Typography;

interface CreateBookingModalProps {
  visible: boolean;
  roomNumber: number;
  roomType: string;
  startDate: Dayjs;
  endDate: Dayjs;
  nights: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CreateBookingModal: FC<CreateBookingModalProps> = ({
  visible,
  roomNumber,
  roomType,
  startDate,
  endDate,
  nights,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={visible}
      title='Создать бронирование?'
      okText='Создать бронирование'
      cancelText='Отмена'
      onOk={onConfirm}
      onCancel={onCancel}
      width={480}
      className={styles.modal}
    >
      <div className={styles.content}>
        <div className={styles.row}>
          <Text type='secondary'>Номер:</Text>
          <Title level={5} className={styles.value}>
            {roomNumber} ({roomType})
          </Title>
        </div>

        <div className={styles.row}>
          <Text type='secondary'>Дата заезда:</Text>
          <Text strong className={styles.value}>
            {startDate.format('DD.MM.YYYY, dddd')}
          </Text>
        </div>

        <div className={styles.row}>
          <Text type='secondary'>Дата выезда:</Text>
          <Text strong className={styles.value}>
            {endDate.format('DD.MM.YYYY, dddd')}
          </Text>
        </div>

        <div className={styles.row}>
          <Text type='secondary'>Количество ночей:</Text>
          <Text strong className={styles.value}>
            {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
          </Text>
        </div>
      </div>
    </Modal>
  );
};
