import type { CSSProperties, FC } from 'react';
import React, { useMemo } from 'react';
import { Form, Input, InputNumber, message, theme } from 'antd';
import {
  type IConsumableUsage,
  useCreateConsumableUsageMutation,
  useGetConsumablesQuery,
  usePatchConsumableUsageMutation,
} from '@entities/consumable';
import { useFetchRoomStocksQuery } from '@entities/booking/api/bookingApi';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage } from '@shared/lib';
import { mapToOptions } from '@shared/lib/mapToOptions';
import styles from './ConsumableUsageForm.module.scss';

interface ConsumableUsageFormProps {
  initialValues?: Partial<IConsumableUsage>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ConsumableUsageForm: FC<ConsumableUsageFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const { data: consumablesData, isLoading: isConsumablesLoading } =
    useGetConsumablesQuery();
  const { data: roomsData, isLoading: isRoomsLoading } =
    useFetchRoomStocksQuery();

  const [createUsage, { isLoading: isCreating }] =
    useCreateConsumableUsageMutation();
  const [patchUsage, { isLoading: isUpdating }] =
    usePatchConsumableUsageMutation();

  const isEdit = !!initialValues?.id;

  const consumableOptions = useMemo(
    () => mapToOptions(consumablesData),
    [consumablesData],
  );

  const roomOptions = useMemo(
    () => mapToOptions(roomsData, 'room_number'),
    [roomsData],
  );

  const onFinish = async (values: any) => {
    try {
      if (isEdit && initialValues?.id) {
        await patchUsage({ id: initialValues.id, ...values }).unwrap();
        message.success('Данные успешно обновлены');
      } else {
        await createUsage(values).unwrap();
        message.success('Запись успешно создана');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const themeVars = {
    '--bg-container': token.colorBgContainer,
    '--border-radius': `${token.borderRadiusLG}px`,
  } as CSSProperties;

  return (
    <div className={styles.container} style={themeVars}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={initialValues}
        requiredMark={false}
        className={styles.form}
      >
        <div className={styles.row}>
          <Form.Item
            label='ID расходника'
            name='consumable_id'
            rules={[{ required: true, message: 'Выберите расходник' }]}
          >
            <Input size='large' placeholder='Введите ID расходника' />
          </Form.Item>

          <Form.Item label='Номер расходника' name='id_number'>
            <Input size='large' placeholder='Введите номер расходника' />
          </Form.Item>
        </div>

        <div className={styles.row_sized}>
          <Form.Item
            label='Расходники'
            name='consumable_id'
            rules={[{ required: true, message: 'Выберите расходник' }]}
          >
            <SelectWithSearch
              placeholder='Расходник'
              options={consumableOptions}
              loading={isConsumablesLoading}
            />
          </Form.Item>

          <Form.Item
            label='Количество'
            name='quantity'
            rules={[{ required: true, message: 'Введите количество' }]}
          >
            <InputNumber
              size='large'
              placeholder='5 кг'
              className={styles.fullWidth}
              min={0}
            />
          </Form.Item>
        </div>

        <Form.Item
          label='Добавил'
          name='user'
          rules={[{ required: true, message: 'Кто добавил' }]}
        >
          <SelectWithSearch
            placeholder='Добавил'
            options={roomOptions}
            loading={isRoomsLoading}
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
