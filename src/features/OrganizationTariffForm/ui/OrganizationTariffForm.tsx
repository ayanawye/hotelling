import React, { useEffect } from 'react';
import { Form, Input, InputNumber, message, Switch } from 'antd';
import { useGetOrganizationsQuery } from '@entities/organizations';
import { useGetHotelRoomsTypesQuery } from '@entities/rooms';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import styles from './OrganizationTariffForm.module.scss';
import { useCreateOrganizationTariffMutation, usePatchOrganizationTariffMutation, } from '@entities/tariff';
import type { IOrganizationTariff } from '@entities/tariff/types';

interface OrganizationFormProps {
  initialValues?: IOrganizationTariff;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const OrganizationTariffForm: React.FC<OrganizationFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const manually = Form.useWatch('manually', form);

  const { data: roomsType } = useGetHotelRoomsTypesQuery();
  const { data: allOrganizations } = useGetOrganizationsQuery();

  const [createTariff, { isLoading: isCreating }] =
    useCreateOrganizationTariffMutation();
  const [patchTariff, { isLoading: isUpdating }] =
    usePatchOrganizationTariffMutation();

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
    if (!values.manually) {
      values.early_check_in = null;
      values.late_departure = null;
    }

    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        await patchTariff({
          id: initialValues.id,
          body: changedValues,
        }).unwrap();

        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        message.success('Тариф успешно обновлен');
      } else {
        await createTariff(values).unwrap();
        message.success('Тариф успешно создан');
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
            name='name'
            label='Тариф'
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder='Введите название тарифа' variant='borderless' />
          </Form.Item>
          <Form.Item
            name={initialValues ? ['organization', 'id'] : 'organization_id'}
            label='Организация'
            rules={[{ required: true, message: 'Выберите организацию' }]}
          >
            <SelectWithSearch
              placeholder='Введите название организации'
              options={mapToOptions(allOrganizations)}
              variant='borderless'
            />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            name={initialValues ? ['room_type', 'id'] : 'room_type_id'}
            label='Выбериет тип номера'
            rules={[{ required: true, message: 'Выбериет тип номера' }]}
          >
            <SelectWithSearch
              placeholder='Выбериет тип номера'
              options={mapToOptions(roomsType)}
              variant='borderless'
            />
          </Form.Item>
          <Form.Item
            name='price'
            label='Цена'
            rules={[{ required: true, message: 'Укажите цену тарифа' }]}
          >
            <Input placeholder='Укажите цену тарифа' variant='borderless' />
          </Form.Item>
        </div>
        <div className={styles.switch}>
          <Form.Item name='manually' valuePropName='checked'>
            <Switch />
          </Form.Item>
          <span>Ручной ввод суммы</span>
        </div>
        {manually && (
          <div className={styles.row}>
            <Form.Item
              name='early_check_in'
              label='Ранний заезд'
              rules={[
                { required: true, message: 'Ранний заезд' },
                {
                  pattern: /^[\d]{0,9}$/,
                  message: 'Value should be less than 999999999',
                },
              ]}
            >
              <InputNumber placeholder='Укажите цену' />
            </Form.Item>

            <Form.Item
              name='late_departure'
              label='Поздний отъезд'
              rules={[{ required: true, message: 'Поздний отъезд' }]}
            >
              <InputNumber placeholder='Укажите цену' />
            </Form.Item>
          </div>
        )}
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
