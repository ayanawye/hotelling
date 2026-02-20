import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import {
  type IHotelFloor,
  useCreateNewHotelFloorMutation,
  useGetHotelEnclosuresQuery,
  usePatchHotelFloorMutation,
} from '@entities/rooms';
import styles from './RoomsForm.module.scss';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';

interface EnclosureFormProps {
  initialValues?: IHotelFloor;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RoomsForm: React.FC<EnclosureFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { data: enclosures } = useGetHotelEnclosuresQuery();
  const [createNewHotelFloor, { isLoading: isCreating }] =
    useCreateNewHotelFloorMutation();
  const [patchHotelFloor, { isLoading: isUpdating }] =
    usePatchHotelFloorMutation();

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
        let changedValues = getChangedFields(initialValues, values);
        if (changedValues?.hull?.id) {
          changedValues.hull_id = changedValues.hull.id;
          delete changedValues.hull;
        }

        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        await patchHotelFloor({
          id: initialValues.id,
          ...changedValues,
        }).unwrap();

        message.success('Этаж успешно обновлен');
      } else {
        await createNewHotelFloor(values).unwrap();
        message.success('Этаж успешно создан');
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
          name={isEdit ? ['hull', 'id'] : 'hull_id'}
          label='Выберите корпус'
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
          name='floor'
          className={styles.fullWidth}
          rules={[{ required: true, message: 'Введите номер этажа' }]}
        >
          <Input
            classNames={{ input: styles.input }}
            size='large'
            placeholder='Введите номер этажа'
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
