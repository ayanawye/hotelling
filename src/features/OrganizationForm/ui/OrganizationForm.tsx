import React, { useEffect } from 'react';
import { Form, Input, message, Select } from 'antd';
import {
  type IOrganization,
  useCreateOrganizationMutation,
  useGetOrganizationTypesQuery,
  usePatchOrganizationMutation,
} from '@entities/organizations';
import { useGetFinancePaymentTypesQuery } from '@entities/finance';
import { type RoomsColor } from '@entities/rooms';
import { Button, SelectWithSearch } from '@shared/ui';
import { colorMap, getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';

import styles from './OrganizationForm.module.scss';

interface OrganizationFormProps {
  initialValues?: IOrganization;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { data: organizationTypes } = useGetOrganizationTypesQuery();
  const { data: paymentTypes } = useGetFinancePaymentTypesQuery();

  const [createOrganization, { isLoading: isCreating }] =
    useCreateOrganizationMutation();
  const [patchOrganization, { isLoading: isUpdating }] =
    usePatchOrganizationMutation();

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
    console.log(values);
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        await patchOrganization({
          id: initialValues.id,
          body: changedValues,
        }).unwrap();

        message.success('Организация успешно обновлена');
      } else {
        await createOrganization(values).unwrap();
        message.success('Организация успешно создана');
      }
      onSuccess?.();
    } catch (error) {
      console.log(error);
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
        <div className={styles.section}>
          <h3>Основная информация</h3>
          <div className={styles.row}>
            <Form.Item
              name='name'
              label='Название'
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input
                placeholder='Введите название организации'
                variant='borderless'
              />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item
              name={
                initialValues
                  ? ['organization_type', 'id']
                  : 'organization_type_id'
              }
              label='Тип клиента'
              rules={[{ required: true, message: 'Выберите тип клиента' }]}
            >
              <SelectWithSearch
                placeholder='Выберите тип клиента'
                options={mapToOptions(organizationTypes)}
                variant='borderless'
              />
            </Form.Item>
            <Form.Item name='manager_username' label='Ведущий менеджер'>
              <Input
                placeholder='Введите ведущего менеджера'
                variant='borderless'
              />
            </Form.Item>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Юридические данные</h3>
          <div className={styles.row}>
            <Form.Item name='inn' label='ИНН'>
              <Input placeholder='Введите ИНН клиента' variant='borderless' />
            </Form.Item>
            <Form.Item name='okpo' label='ОКПО'>
              <Input placeholder='Введите ОКПО клиента' variant='borderless' />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item name='ugns' label='УГНС'>
              <Input placeholder='Введите УГНС клиента' variant='borderless' />
            </Form.Item>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Банковские реквизиты</h3>
          <div className={styles.row}>
            <Form.Item name='bank' label='Банк'>
              <Input
                placeholder='Введите название банка'
                variant='borderless'
              />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item name='bik' label='БИК'>
              <Input placeholder='Введите БИК' variant='borderless' />
            </Form.Item>
            <Form.Item name='swift' label='SWIFT'>
              <Input placeholder='Введите SWIFT' variant='borderless' />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item name='settlement' label='Расчетный счет'>
              <Input
                placeholder='Введите расчетный счет'
                variant='borderless'
              />
            </Form.Item>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Контактные данные</h3>
          <div className={styles.row}>
            <Form.Item name='gmail' label='Email'>
              <Input placeholder='Email' variant='borderless' />
            </Form.Item>
            <Form.Item name='website' label='Веб сайт'>
              <Input placeholder='Веб сайт' variant='borderless' />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item
              name='first_phone'
              label='Телефон 1'
              rules={[
                {
                  pattern: /^\+\d+$/,
                  message: "Номер должен начинаться с '+'",
                },
              ]}
            >
              <Input placeholder='Телефон 1' variant='borderless' />
            </Form.Item>
            <Form.Item
              name='second_phone'
              label='Телефон 2'
              rules={[
                {
                  pattern: /^\+\d+$/,
                  message: "Номер должен начинаться с '+'",
                },
              ]}
            >
              <Input placeholder='Телефон 2' variant='borderless' />
            </Form.Item>
          </div>
          <div className={styles.row}>
            <Form.Item
              name='third_phone'
              label='Телефон 3'
              rules={[
                {
                  pattern: /^\+\d+$/,
                  message: "Номер должен начинаться с '+'",
                },
              ]}
            >
              <Input placeholder='Телефон 3' variant='borderless' />
            </Form.Item>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.row}>
            <Form.Item name='address' label='Адрес'>
              <Input placeholder='Введите адрес клиента' variant='borderless' />
            </Form.Item>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Финансовые настройки</h3>
          <div className={styles.row}>
            <Form.Item
              name={
                initialValues?.payment_type_id
                  ? 'payment_type_id'
                  : ['payment_type', 'id']
              }
              label='Вид платежа'
            >
              <Select
                placeholder='Выберите вид платежа'
                options={mapToOptions(
                  paymentTypes?.map((el) => ({ ...el, name: el.type })),
                )}
                variant='borderless'
              />
            </Form.Item>
            <Form.Item name='armor_color' label='Цвет брони'>
              <Select
                className={styles.select}
                placeholder='Цвет брони'
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
