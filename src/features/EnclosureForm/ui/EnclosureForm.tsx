import React, { useEffect } from 'react';
import { Form, Input, message, theme } from 'antd';
import {
  type IHotelEnclosure,
  useCreateNewHotelEnclosureMutation,
  usePatchHotelEnclosureMutation,
} from '@entities/rooms';
import styles from './EnclosureForm.module.scss';
import { Button } from '@shared/ui';
import { getErrorMessage } from '@shared/lib';

interface EnclosureFormProps {
  initialValues?: IHotelEnclosure;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EnclosureForm: React.FC<EnclosureFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [createEnclosure, { isLoading: isCreating }] =
    useCreateNewHotelEnclosureMutation();
  const [updateEnclosure, { isLoading: isUpdating }] =
    usePatchHotelEnclosureMutation();

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
        await updateEnclosure({ ...initialValues, ...values }).unwrap();
        message.success('Корпус успешно обновлен');
      } else {
        await createEnclosure(values).unwrap();
        message.success('Корпус успешно создан');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const dynamicVars = {
    '--bg-container': token.colorBgContainer,
    '--border-radius': `${token.borderRadiusLG}px`,
    '--color-primary': token.colorPrimary,
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
        <Form.Item
          label='Корпус'
          name='name'
          className={styles.fullWidth}
          rules={[{ required: true, message: 'Введите название корпуса' }]}
        >
          <Input
            classNames={{ input: styles.input }}
            size='large'
            placeholder='Введите название корпуса'
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
          <Button variant='outlined_big' onClick={onCancel}>
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
