import React, { useEffect } from 'react';
import { Form, Input, InputNumber, message, Switch } from 'antd';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import type { IService } from '@entities/services/types';
import {
  useCreateServiceMutation,
  useGetServiceCategoriesQuery,
  usePatchServiceMutation,
} from '@entities/services';

import styles from './ServiceForm.module.scss';

interface ComponentProps {
  initialValues?: IService;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ServiceForm: React.FC<ComponentProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { data: allServices } = useGetServiceCategoriesQuery();

  const [createItem, { isLoading: isCreating }] = useCreateServiceMutation();
  const [patchItem, { isLoading: isUpdating }] = usePatchServiceMutation();

  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        price: Number(initialValues.price),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        await patchItem({ id: initialValues?.id, ...changedValues }).unwrap();

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
        <div className={styles.row}>
          <Form.Item
            name='name'
            label='Название'
            rules={[{ required: true, message: 'Введите название услуги' }]}
          >
            <Input placeholder='Введите название услуги' variant='borderless' />
          </Form.Item>

          <Form.Item
            name={'category'}
            label='Категория'
            rules={[{ required: true, message: 'Выберите категорию' }]}
          >
            <SelectWithSearch
              placeholder='Выберите категорию'
              options={mapToOptions(allServices)}
              variant='borderless'
            />
          </Form.Item>
        </div>
        <Form.Item
          name='price'
          label='Цена'
          rules={[
            { required: true, message: 'Введите цену' },
            {
              pattern: /^[\d]{0,9}$/,
              message: 'Value should be less than 999999999',
            },
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
        <Form.Item name='description' label='Описание'>
          <Input.TextArea
            className={styles.textarea}
            rows={4}
            placeholder='Напишите...'
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
