import React, { useEffect } from 'react';
import { Form, Input, message, Select, theme } from 'antd';
import {
  type IRoomStatus,
  type RoomsColor,
  useCreateHotelRoomsStatusMutation,
  usePatchHotelRoomStatusMutation,
} from '@entities/rooms';
import { Button } from '@shared/ui';
import { colorMap, getErrorMessage } from '@shared/lib';
import styles from './RoomStatusForm.module.scss';

interface RoomStatusFormProps {
  initialValues?: IRoomStatus;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RoomStatusForm: React.FC<RoomStatusFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [createHotelRoomsStatus, { isLoading: isCreating }] =
    useCreateHotelRoomsStatusMutation();
  const [patchHotelRoomStatus, { isLoading: isUpdating }] =
    usePatchHotelRoomStatusMutation();

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
        await patchHotelRoomStatus({
          ...initialValues,
          ...values,
        }).unwrap();
        message.success('Статус номера успешно обновлен');
      } else {
        await createHotelRoomsStatus(values).unwrap();
        message.success('Статус номера успешно создан');
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
          rules={[{ required: true, message: 'Введите название статуса' }]}
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
              placeholder='Цвет статуса'
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
