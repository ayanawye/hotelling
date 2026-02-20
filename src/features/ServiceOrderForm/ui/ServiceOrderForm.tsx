import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message } from 'antd';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import type { IServiceOrder } from '@entities/services/types';
import {
  useCreateServiceOrderMutation,
  useGetServicesQuery,
  usePatchServiceOrderMutation,
} from '@entities/services';

import styles from './ServiceOrderForm.module.scss';
import { useGetGuestsQuery } from '@entities/guests';
import { DeleteRedIcon } from '@shared/assets';

interface ComponentProps {
  initialValues?: IServiceOrder;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ServiceOrderForm: React.FC<ComponentProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const selectedGuestId = Form.useWatch('guest_id', form);

  const { data: guests } = useGetGuestsQuery();
  const { data: allServices } = useGetServicesQuery();

  const [createItem, { isLoading: isCreating }] =
    useCreateServiceOrderMutation();
  const [patchItem, { isLoading: isUpdating }] = usePatchServiceOrderMutation();

  const isEdit = !!initialValues?.id;
  const [allSelectedServices, setAllSelectedServices] = useState<
    IServiceOrder[]
  >([]);
  const selectedGuest = guests?.results?.find(
    (guest) => guest.id === selectedGuestId,
  );

  const handleSelectService = (value: number) => {
    const serviceInfo = allServices?.find((s) => s.id === value);

    if (!serviceInfo) return;

    const isAlreadySelected = allSelectedServices.some(
      (s) => s.service_id === value,
    );

    if (isAlreadySelected) {
      message.info('Эта услуга уже добавлена');
      return;
    }

    const newService: IServiceOrder = {
      service_id: value,
      service_name: serviceInfo.name,
      quantity: 1,
      unit_amount: serviceInfo.price,
    };

    setAllSelectedServices((prev) => [...prev, newService]);
  };

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
        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }
        await patchItem({ id: initialValues?.id, ...changedValues }).unwrap();
        message.success('Успешно обновлен');
      } else {
        // Если выбрано несколько услуг через массив
        if (allSelectedServices.length > 0) {
          for (const service of allSelectedServices) {
            await createItem({
              ...values,
              ...service,
            }).unwrap();
          }
        } else {
          await createItem(values).unwrap();
        }
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
            name='guest_id'
            label='Гость'
            rules={[{ required: true, message: 'Выберите гостя' }]}
          >
            <SelectWithSearch
              placeholder='Выберите гостя'
              options={mapToOptions(guests?.results)}
              variant='borderless'
            />
          </Form.Item>

          {selectedGuestId && (
            <Form.Item
              name={'reservation_id'}
              label='Бронирование'
              rules={[{ required: true, message: 'Выберите бронирование' }]}
            >
              <SelectWithSearch
                placeholder='Выберите бронирование'
                options={mapToOptions(selectedGuest?.bookings)}
                variant='borderless'
              />
            </Form.Item>
          )}
        </div>
        <Form.Item label='Услуги'>
          <SelectWithSearch
            placeholder='Выберите услугу'
            options={mapToOptions(allServices)}
            variant='borderless'
            onSelect={handleSelectService}
            value={null}
          />
        </Form.Item>

        <div className={styles.selectedServices}>
          {allSelectedServices.map((service, index) => (
            <div key={index} className={styles.serviceItem}>
              <Input disabled value={service.service_name} />
              <InputNumber
                min={1}
                value={Number(service.quantity)}
                onChange={(value) => {
                  setAllSelectedServices((prev) =>
                    prev.map((el, i) =>
                      i === index ? { ...el, quantity: value } : el,
                    ),
                  );
                }}
              />
              <Input
                disabled
                value={Number(service.quantity) * Number(service.unit_amount)}
              />
              <Button
                variant='outlined_danger'
                onClick={() => {
                  setAllSelectedServices((prev) =>
                    prev.filter((_, i) => i !== index),
                  );
                }}
              >
                <DeleteRedIcon />
              </Button>
            </div>
          ))}
        </div>

        <Form.Item
          name={'created_by_id'}
          label='Кто создал'
          rules={[{ required: true, message: 'Выберите кто создал' }]}
        >
          <SelectWithSearch
            placeholder='Выберите кто создал'
            options={mapToOptions(guests?.results)}
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
