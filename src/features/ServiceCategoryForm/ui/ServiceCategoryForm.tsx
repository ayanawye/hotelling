import React, { useEffect } from 'react';
import { Form, Input, InputNumber, message, Switch } from 'antd';
import { Button } from '@shared/ui';
import { getErrorMessage } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import type { IServiceCategory } from '@entities/services/types';
import {
  useCreateServiceCategoryMutation,
  usePatchServiceCategoryMutation,
} from '@entities/services';

import styles from './ServiceCategoryForm.module.scss';

interface ComponentProps {
  initialValues?: IServiceCategory;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ServiceCategoryForm: React.FC<ComponentProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [createItem, { isLoading: isCreating }] =
    useCreateServiceCategoryMutation();
  const [patchItem, { isLoading: isUpdating }] =
    usePatchServiceCategoryMutation();

  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        await patchItem({ id: initialValues.id, ...changedValues }).unwrap();

        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        message.success('Успешно обновлен');
      } else {
        await createItem(values).unwrap();
        message.success('Успешно создано');
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
        className={styles.form}
        requiredMark={false}
      >
        <Form.Item
          name='name'
          label='Название'
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input
            placeholder='Введите название категории'
            variant='borderless'
          />
        </Form.Item>
        <Form.Item
          name='sort_order'
          label='Порядок сортировки'
          rules={[
            {
              pattern: /^[\d]{0,9}$/,
              message: 'Value should be less than 999999999',
            },
            { required: true, message: 'Порядок сортировки' },
          ]}
        >
          <InputNumber placeholder='0' />
        </Form.Item>
        <div className={styles.switch}>
          <Form.Item name='is_active' valuePropName='checked'>
            <Switch />
          </Form.Item>
          <span>Активна</span>
        </div>
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
