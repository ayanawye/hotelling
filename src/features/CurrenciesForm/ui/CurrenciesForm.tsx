import React from 'react';
import { Form, Input, message, Switch, theme } from 'antd';
import { useCreateFinanceCurrencyMutation } from '@entities/finance';
import { Button } from '@shared/ui';
import styles from './CurrenciesForm.module.scss';
import { getErrorMessage } from '@shared/lib';

interface CurrenciesFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CurrenciesForm: React.FC<CurrenciesFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [createFinanceCurrency, { isLoading: isCreating }] =
    useCreateFinanceCurrencyMutation();

  const onFinish = async (values: any) => {
    try {
      await createFinanceCurrency(values).unwrap();
      message.success('Валюта успешно создана');
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const dynamicVars = {
    '--bg-container': token.colorBgContainer,
    '--border-radius': `${token.borderRadiusLG}px`,
    '--color-primary': token.colorPrimary,
    '--border-color': '#e5e5e5',
  } as React.CSSProperties;

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        className={styles.form}
        style={dynamicVars}
        requiredMark={false}
      >
        <div className={styles.row}>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input size='large' placeholder='Название' variant='borderless' />
          </Form.Item>

          <Form.Item
            name='code'
            rules={[
              { required: true, message: 'Введите код' },
              {
                min: 1,
                max: 3,
                message: 'Код должен содержать от 1 до 3 символов',
              },
            ]}
          >
            <Input size='large' placeholder='Код' variant='borderless' />
          </Form.Item>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Использование валюты</div>
          <div className={styles.switchGroup}>
            <Form.Item name='is_base' valuePropName='checked'>
              <div className={styles.switchRow}>
                <Switch />
                <span>Базовая</span>
              </div>
            </Form.Item>
            <Form.Item name='is_operational' valuePropName='checked'>
              <div className={styles.switchRow}>
                <Switch />
                <span>Операционная</span>
              </div>
            </Form.Item>
            <Form.Item name='is_allowed_for_payment' valuePropName='checked'>
              <div className={styles.switchRow}>
                <Switch />
                <span>Доступна для оплаты</span>
              </div>
            </Form.Item>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Статус</div>
          <Form.Item name='is_active' valuePropName='checked'>
            <div className={styles.switchRow}>
              <Switch />
              <span>Активна</span>
            </div>
          </Form.Item>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Курс к базовой валюте</div>
          <Form.Item
            name='rate_to_base'
            rules={[{ required: true, message: 'Введите курс' }]}
          >
            <Input
              size='large'
              placeholder='Введите курс'
              variant='borderless'
            />
          </Form.Item>
        </div>

        <div className={styles.actions}>
          <Button
            variant='primary_big'
            htmlType='submit'
            isLoading={isCreating}
          >
            Создать
          </Button>
          <Button htmlType='button' variant='outlined_big' onClick={onCancel}>
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
