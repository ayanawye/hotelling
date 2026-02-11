import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import {
  type IRoomStock,
  useCreateHotelRoomStockMutation,
  useGetHotelEnclosuresQuery,
  useGetHotelFloorsQuery,
  useGetHotelRoomsStatusQuery,
  useGetHotelRoomsTypesQuery,
  usePatchHotelRoomStockMutation,
} from '@entities/rooms';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import styles from './RoomStockForm.module.scss';

interface RoomStockFormProps {
  initialValues?: IRoomStock;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RoomStockForm: React.FC<RoomStockFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { data: enclosures } = useGetHotelEnclosuresQuery();
  const { data: floors } = useGetHotelFloorsQuery();
  const { data: types } = useGetHotelRoomsTypesQuery();
  const { data: statuses } = useGetHotelRoomsStatusQuery();

  const [createRoomStock, { isLoading: isCreating }] =
    useCreateHotelRoomStockMutation();
  const [patchRoomStock, { isLoading: isUpdating }] =
    usePatchHotelRoomStockMutation();

  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        hull_id: initialValues.hull_id || initialValues.hull?.id,
        floor_id: initialValues.floor_id || initialValues.floor?.id,
        room_type_id: initialValues.room_type_id || initialValues.room_type?.id,
        status_id: initialValues.status_id || initialValues.status?.id,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        await patchRoomStock({
          ...initialValues,
          ...values,
          id: initialValues.id,
        }).unwrap();
        message.success('Номер успешно обновлен');
      } else {
        await createRoomStock(values).unwrap();
        message.success('Номер успешно создан');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  console.log(form.getFieldsValue());

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
            name='hull_id'
            rules={[{ required: true, message: 'Выберите корпус' }]}
          >
            <SelectWithSearch
              size='large'
              placeholder='Корпус'
              options={mapToOptions(enclosures)}
            />
          </Form.Item>

          <Form.Item
            name='floor_id'
            rules={[{ required: true, message: 'Выберите этаж' }]}
          >
            <SelectWithSearch
              size='large'
              placeholder='Этаж'
              options={mapToOptions(floors, 'floor')}
            />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            name='room'
            rules={[{ required: true, message: 'Введите номер комнаты' }]}
          >
            <Input
              className={styles.input}
              size='large'
              placeholder='Номер комнаты'
            />
          </Form.Item>

          <Form.Item
            name='room_type_id'
            rules={[{ required: true, message: 'Выберите тип номера' }]}
          >
            <SelectWithSearch
              size='large'
              placeholder='Тип номера'
              options={mapToOptions(types)}
            />
          </Form.Item>
        </div>

        <Form.Item
          name='status_id'
          rules={[{ required: true, message: 'Выберите статус номера' }]}
        >
          <SelectWithSearch
            size='large'
            placeholder='Статус номера'
            options={mapToOptions(statuses)}
          />
        </Form.Item>

        <Form.Item name='description' label='Примечание'>
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
