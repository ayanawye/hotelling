import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import {
  type IFinancePaymentType,
  useCreateFinancePaymentTypeMutation,
  usePatchFinancePaymentTypeMutation,
} from '@entities/finance';
import { Button, SelectWithSearch } from '@shared/ui';
import styles from './PaymentTypesForm.module.scss';
import { getErrorMessage } from '@shared/lib';

interface PaymentTypesFormProps {
  initialValues?: IFinancePaymentType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PaymentTypesForm: React.FC<PaymentTypesFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [createPaymentType, { isLoading: isCreating }] =
    useCreateFinancePaymentTypeMutation();
  const [patchPaymentType, { isLoading: isUpdating }] =
    usePatchFinancePaymentTypeMutation();

  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        await patchPaymentType({ ...initialValues, ...values }).unwrap();
        message.success('Тип оплаты успешно обновлен');
      } else {
        await createPaymentType(values).unwrap();
        message.success('Тип оплаты успешно создан');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const paymentTypeOptions = [
    { label: 'Наличные', value: 'cash' },
    { label: 'Карта', value: 'card' },
    { label: 'Перевод', value: 'transfer' },
  ];

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        className={styles.form}
        requiredMark={false}
      >
        <div className={styles.row}>
          <Form.Item
            name='code'
            rules={[{ required: true, message: 'Введите код' }]}
          >
            <Input size='large' placeholder='Код' variant='borderless' />
          </Form.Item>

          <Form.Item
            name='operation'
            rules={[{ required: true, message: 'Введите название операции' }]}
          >
            <Input
              size='large'
              placeholder='Название операции'
              variant='borderless'
            />
          </Form.Item>
        </div>

        <Form.Item
          name='type'
          className={styles.select}
          rules={[{ required: true, message: 'Выберите тип оплаты' }]}
        >
          <SelectWithSearch
            size='large'
            placeholder='Тип оплаты'
            options={paymentTypeOptions}
          />
        </Form.Item>

        <div className={styles.actions}>
          <Button
            variant='primary_big'
            htmlType='submit'
            isLoading={isCreating || isUpdating}
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
          <Button htmlType='button' variant='outlined_big' onClick={onCancel}>
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
