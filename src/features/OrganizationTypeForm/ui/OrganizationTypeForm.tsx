import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import {
  type IOrganizationType,
  useCreateOrganizationTypeMutation,
  usePatchOrganizationTypeMutation,
} from '@entities/organizations';
import { Button } from '@shared/ui';
import { getErrorMessage } from '@shared/lib';
import styles from './OrganizationTypeForm.module.scss';
import { getChangedFields } from '@shared/utils';

interface OrganizationFormProps {
  initialValues?: IOrganizationType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const OrganizationTypeForm: React.FC<OrganizationFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [createOrganizationType, { isLoading: isCreating }] =
    useCreateOrganizationTypeMutation();
  const [patchOrganizationType, { isLoading: isUpdating }] =
    usePatchOrganizationTypeMutation();

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
        await patchOrganizationType({
          id: initialValues.id,
          body: changedValues,
        }).unwrap();

        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        message.success('Тип организации успешно обновлен');
      } else {
        await createOrganizationType(values).unwrap();
        message.success('Тип организации успешно создан');
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
        <div className={styles.section}>
          <div className={styles.row}>
            <Form.Item
              name='name'
              label='Название'
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input
                placeholder='Введите название типа организации '
                variant='borderless'
              />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item
              name='code'
              label='Код'
              rules={[{ required: true, message: 'Введите код' }]}
            >
              <Input
                placeholder='Введите код организации'
                variant='borderless'
              />
            </Form.Item>
            <Form.Item
              name='name'
              label='Название операции'
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input
                placeholder='Введите название операции'
                variant='borderless'
              />
            </Form.Item>
          </div>
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
