import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import {
  type IConsumable,
  useCreateConsumableBreakdownMutation,
  useGetConsumableCategoriesQuery,
  usePatchConsumableBreakdownMutation,
} from '@entities/consumable';

import styles from './ConsumableBreakdownForm.module.scss';

interface ComponentProps {
  initialValues?: IConsumable;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ConsumableBreakdownForm: React.FC<ComponentProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { data: allCategories } = useGetConsumableCategoriesQuery();
  const [createItem, { isLoading: isCreating }] =
    useCreateConsumableBreakdownMutation();
  const [patchItem, { isLoading: isUpdating }] =
    usePatchConsumableBreakdownMutation();

  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category_id: initialValues.category?.id || initialValues.category_id,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        if (!changedValues) {
          message.info('Нет изменений');
          onSuccess?.();
          return;
        }
        await patchItem({ id: initialValues.id, ...changedValues }).unwrap();
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
        <div className={styles.row}>
          <Form.Item
            name='name'
            label='Название'
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder='Введите название' variant='borderless' />
          </Form.Item>
          <Form.Item
            name='category_id'
            label='Категория'
            rules={[{ required: true, message: 'Выберите категорию' }]}
          >
            <SelectWithSearch
              placeholder='Выберите категорию'
              options={mapToOptions(allCategories)}
              variant='borderless'
            />
          </Form.Item>
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
