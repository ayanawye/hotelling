import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import type { IConsumable } from '@entities/consumable';
import { useGetConsumableCategoriesQuery } from '@entities/consumable';

import styles from './ConsumableCategoryForm.module.scss';

interface ComponentProps {
  initialValues?: IConsumable;
  onSuccess?: () => void;
  onCancel?: () => void;
  apiFunc: (values: any) => Promise<any>;
  isLoading?: boolean;
}

export const ConsumableCategoryForm: React.FC<ComponentProps> = ({
  initialValues,
  onSuccess,
  onCancel,
  apiFunc,
  isLoading,
}) => {
  const [form] = Form.useForm();

  const { data: allCategories } = useGetConsumableCategoriesQuery();
  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category_id: initialValues.category?.id,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        await apiFunc({ id: initialValues.id, ...changedValues }).unwrap();

        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        message.success('Успешно обновлен');
      } else {
        await apiFunc(values).unwrap();
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
            <Input
              placeholder='Введите название категории'
              variant='borderless'
            />
          </Form.Item>
          <Form.Item name='category_id' label='Старшая категория'>
            <SelectWithSearch
              placeholder='Выберите категорию'
              options={mapToOptions(allCategories)}
              variant='borderless'
            />
          </Form.Item>
        </div>
        <div className={styles.actions}>
          <Button variant='primary_big' htmlType='submit' isLoading={isLoading}>
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
