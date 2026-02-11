import React from 'react';
import { Form, Input, message, Switch } from 'antd';
import {
  type IFinanceTax,
  useCreateFinanceTaxMutation,
  usePatchFinanceTaxMutation,
} from '@entities/finance';
import { Button } from '@shared/ui';
import styles from './TaxForm.module.scss';
import { getErrorMessage } from '@shared/lib';

interface TaxFormProps {
  initialValues?: IFinanceTax;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const TaxForm: React.FC<TaxFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [createFinanceTax, { isLoading: isCreating }] =
    useCreateFinanceTaxMutation();
  const [patchFinanceTax, { isLoading: isUpdating }] =
    usePatchFinanceTaxMutation();

  const isEdit = !!initialValues?.id;

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      if (isEdit) {
        await patchFinanceTax({ ...initialValues, ...values }).unwrap();
        message.success('Налог успешно обновлен');
      } else {
        await createFinanceTax(values).unwrap();
        message.success('Налог успешно создан');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={initialValues}
        className={styles.form}
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

        <div className={styles.row}>
          <Form.Item
            name='percent'
            rules={[{ required: true, message: 'Введите процент' }]}
          >
            <Input size='large' placeholder='Процент' variant='borderless' />
          </Form.Item>
        </div>

        <div className={styles.switch}>
          <Form.Item name='status' valuePropName='checked'>
            <Switch />
          </Form.Item>
          <span>Включать в стоимость</span>
        </div>

        <Form.Item label='Примечание' name='description'>
          <Input.TextArea
            rows={4}
            placeholder='Text area'
            size='large'
            variant='borderless'
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
