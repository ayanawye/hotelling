import React, { useEffect } from 'react';
import { Form, Input, message, Select, theme } from 'antd';
import {
  type IRoomType,
  type RoomsColor,
  useCreateHotelRoomsTypeMutation,
  usePatchHotelRoomsTypeMutation,
} from '@entities/rooms';
import { Button } from '@shared/ui';
import { colorMap, getErrorMessage } from '@shared/lib';
import styles from './RoomTypeForm.module.scss';

interface RoomTypeFormProps {
  initialValues?: IRoomType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RoomTypeForm: React.FC<RoomTypeFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [createHotelRoomsType, { isLoading: isCreating }] =
    useCreateHotelRoomsTypeMutation();
  const [patchHotelRoomsType, { isLoading: isUpdating }] =
    usePatchHotelRoomsTypeMutation();

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
        await patchHotelRoomsType({
          ...initialValues,
          ...values,
        }).unwrap();
        message.success('Тип номера успешно обновлен');
      } else {
        await createHotelRoomsType(values).unwrap();
        message.success('Тип номера успешно создан');
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
          name='name'
          rules={[{ required: true, message: 'Введите название типа номера' }]}
        >
          <Input className={styles.input} size='large' placeholder='Название' />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            name='code'
            rules={[{ required: true, message: 'Введите код' }]}
          >
            <Input className={styles.input} size='large' placeholder='Код' />
          </Form.Item>

          <Form.Item
            name='color'
            rules={[{ required: true, message: 'Выберите цвет' }]}
          >
            <Select
              className={styles.select}
              placeholder='Цвет типа номера'
              size='large'
              variant='borderless'
            >
              {(Object.keys(colorMap) as RoomsColor[]).map((color) => (
                <Select.Option key={color} value={color}>
                  <div className={styles.colorOption}>
                    <div
                      className={styles.colorCircle}
                      style={{
                        background: colorMap[color].hex,
                        border: color === 'white' ? '1px solid #ddd' : 'none',
                      }}
                    />
                    <span>{colorMap[color].name}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
