import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import {
  type ILaundryOrder,
  type IWashingCreateItem,
  useCreateLaundryOrderMutation,
  useGetLaundryItemsQuery,
  usePatchLaundryOrderMutation,
} from '@entities/laundry';
import { useGetGuestsQuery } from '@entities/guests';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import styles from './LaundryOrderForm.module.scss';
import { DeleteRedIcon } from '@shared/assets';
import { useGetStaffsQuery } from '@entities/staff';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { serviceSelector, setOrderUserService } from '@entities/services';

interface LaundryOrderFormProps {
  initialValues?: ILaundryOrder;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const LaundryOrderForm: React.FC<LaundryOrderFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const selectedLaundryPersonal = Form.useWatch('laundry_personal_id', form);

  const { data: guestsData, isLoading: isGuestsLoading } = useGetGuestsQuery();
  const { data: staff = [], isLoading: isStaffLoading } =
    useGetStaffsQuery('laundry');
  const { data: items, isLoading: isItemsLoading } = useGetLaundryItemsQuery();
  const { orderUserService } = useAppSelector(serviceSelector);

  const [createOrder, { isLoading: isCreating }] =
    useCreateLaundryOrderMutation();
  const [updateOrder, { isLoading: isUpdating }] =
    usePatchLaundryOrderMutation();

  const isEdit = !!initialValues?.id;
  const [allSelectedWashingItems, setAllSelectedWashingItems] = useState<
    IWashingCreateItem[]
  >([]);

  useEffect(() => {
    if (initialValues) {
      setAllSelectedWashingItems(initialValues.items);
      form.setFieldsValue({
        guest_id: initialValues.guest.id,
        laundry_personal_id: initialValues.laundry_personal?.id,
        comment: initialValues.comment,
        time: initialValues.created_at ? dayjs(initialValues.created_at) : null,
      });
    }
    if (orderUserService) {
      form.setFieldsValue({
        guest_id: orderUserService?.id || 1,
      });
    }
  }, [initialValues, orderUserService, form]);

  const handleSelectItem = (value: number) => {
    const serviceInfo = items?.find((s) => s.id === value);

    if (!serviceInfo) return;

    const isAlreadySelected = allSelectedWashingItems.some(
      (s) => s.item_id === value,
    );

    if (isAlreadySelected) {
      message.info('Этот предмет уже добавлен');
      return;
    }

    const newService: IWashingCreateItem = {
      item_id: value,
      quantity: 1,
      name: serviceInfo.name,
      unit_amount: 1,
    };

    setAllSelectedWashingItems((prev) => [...prev, newService]);
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        items: allSelectedWashingItems,
        planned_pickup_time: dayjs(values.planned_pickup_time).format('HH:mm'),
      };

      if (isEdit) {
        await updateOrder({ id: initialValues.id, ...payload }).unwrap();
        message.success('Заказ успешно обновлен');
      } else {
        await createOrder(payload).unwrap();
        message.success('Заказ успешно создан');
      }
      dispatch(setOrderUserService(null));
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
        {orderUserService ? (
          <>
            <Form.Item name='guest_id' hidden>
              <Input />
            </Form.Item>

            <Form.Item label='Гость'>
              <Input
                value={`${orderUserService?.first_name} ${orderUserService?.last_name}`}
                disabled
              />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            name='guest_id'
            label='Гость'
            className={styles.select}
            rules={[{ required: true, message: 'Выберите гостя' }]}
          >
            <SelectWithSearch
              placeholder='Выберите гостя'
              options={mapToOptions(guestsData?.results)}
              variant='borderless'
              loading={isGuestsLoading}
            />
          </Form.Item>
        )}

        <Form.Item
          label='Клининг персонал'
          name='laundry_personal_id'
          className={styles.select}
          rules={[{ required: true, message: 'Выберите клининг персонал' }]}
        >
          <Select
            placeholder='Выберите клининг персонал'
            options={mapToOptions(staff)}
            loading={isStaffLoading}
            size='large'
          />
        </Form.Item>

        <Form.Item
          label='Предметы'
          className={styles.select}
          validateStatus={
            selectedLaundryPersonal && allSelectedWashingItems.length === 0
              ? 'error'
              : ''
          }
          help={
            selectedLaundryPersonal && allSelectedWashingItems.length === 0
              ? 'Выберите предметы'
              : ''
          }
        >
          <Select
            placeholder='Выберите предметы'
            options={mapToOptions(items)}
            loading={isItemsLoading}
            onSelect={handleSelectItem}
            size='large'
          />
        </Form.Item>

        {allSelectedWashingItems.length ? (
          <div className={styles.selectedServices}>
            {allSelectedWashingItems.map((service, index) => (
              <div key={index} className={styles.serviceItem}>
                <Input disabled value={service.name} />
                <InputNumber
                  min={1}
                  value={Number(service.quantity)}
                  suffix={'шт'}
                  onChange={(value) => {
                    setAllSelectedWashingItems((prev) =>
                      prev.map((el, i) =>
                        i === index ? { ...el, quantity: value } : el,
                      ),
                    );
                  }}
                />
                <InputNumber
                  min={1}
                  value={Number(service.unit_amount)}
                  suffix={'цена'}
                  onChange={(value) => {
                    setAllSelectedWashingItems((prev) =>
                      prev.map((el, i) =>
                        i === index ? { ...el, unit_amount: value } : el,
                      ),
                    );
                  }}
                />
                <Button
                  variant='outlined_danger'
                  onClick={() => {
                    setAllSelectedWashingItems((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                >
                  <DeleteRedIcon />
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        <Form.Item label='Описание' name='comment' className={styles.fullWidth}>
          <Input.TextArea
            placeholder='Введите описание'
            size='large'
            rows={4}
          />
        </Form.Item>

        <Form.Item
          label='Время выдачи'
          name='planned_pickup_time'
          className={styles.fullWidth}
        >
          <TimePicker
            format='HH:mm'
            style={{ width: '100%' }}
            size='large'
            placeholder='15:00'
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
