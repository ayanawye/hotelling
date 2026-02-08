import React, { useEffect } from 'react';
import { Form, Input, message, theme } from 'antd';
import {
  type IHotelEnclosure,
  useCreateNewHotelEnclosureMutation,
  useGetHotelEnclosuresQuery,
  usePatchHotelEnclosureMutation,
} from '@entities/rooms';
import { SelectWithSearch } from '@shared/ui/SelectWithSearch/SelectWithSearch';
import styles from './EnclosureForm.module.scss';
import { Button } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';

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

  const { data: enclosures } = useGetHotelEnclosuresQuery();
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
          label='Введите свой номер телефона'
          name='phone'
          className={styles.fullWidth}
          rules={[{ required: true, message: 'Введите номер телефона' }]}
        >
          <Input
            classNames={{ input: styles.input }}
            size='large'
            placeholder='+996'
            variant='borderless'
          />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            name='name'
            className={styles.select}
            rules={[{ required: true, message: 'Введите название корпуса' }]}
          >
            <SelectWithSearch
              size='large'
              placeholder='Название корпуса'
              options={mapToOptions(enclosures)}
            />
          </Form.Item>

          <Form.Item
            className={styles.select}
            name='floor'
            rules={[{ required: true, message: 'Выберите этаж' }]}
          >
            <SelectWithSearch size='large' placeholder='Этаж' options={[]} />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            className={styles.select}
            name='room_type'
            rules={[{ required: true, message: 'Выберите тип номера' }]}
          >
            <SelectWithSearch
              size='large'
              placeholder='Тип номера'
              options={[]}
            />
          </Form.Item>

          <Form.Item
            className={styles.select}
            name='room_number'
            rules={[{ required: true, message: 'Выберите номер комнаты' }]}
          >
            <SelectWithSearch
              size='large'
              placeholder='Номер комнаты'
              options={[]}
            />
          </Form.Item>
        </div>

        <Form.Item
          className={styles.select}
          name='status'
          rules={[{ required: true, message: 'Выберите статус' }]}
        >
          <SelectWithSearch
            size='large'
            placeholder='Статус'
            options={[]}
            className={styles.fullWidth}
          />
        </Form.Item>

        <Form.Item
          label='Примечание'
          name='note'
          rules={[{ required: true, message: 'Введите примечание' }]}
        >
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
          <Button variant='outlined_big' onClick={onCancel}>
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
