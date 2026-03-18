import { Form, Input } from 'antd';
import { type ICashBalance } from '@entities/cash';
import styles from './CashBalanceForm.module.scss';
import { Button } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { dateFormat } from '@shared/lib';
import type { FC } from 'react';

interface ComponentProps {
  data?: ICashBalance;
}

export const CashBalanceForm: FC<ComponentProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Form
        layout='vertical'
        initialValues={data}
        disabled
        className={styles.form}
      >
        <Form.Item label='Касса' name='cashbox_name'>
          <Input />
        </Form.Item>

        <Form.Item label='Валюта' name='currency_code'>
          <Input />
        </Form.Item>

        <Form.Item label='Баланс' name='amount'>
          <Input />
        </Form.Item>

        <Form.Item
          label='Последнее обновление'
          name='updated_at'
          getValueProps={(value) => ({
            value: value ? dayjs(value).format(dateFormat) : null,
          })}
        >
          <Input />
        </Form.Item>

        <div className={styles.actions}>
          <Button variant='outlined_big' onClick={() => navigate(-1)}>
            Назад
          </Button>
        </div>
      </Form>
    </div>
  );
};
