import React, { useEffect } from 'react';
import { Form, InputNumber, message } from 'antd';
import { DeleteRedIcon } from '@shared/assets';
import { Button, SelectWithSearch } from '@shared/ui';
import {
  useGetCleaningWorkersQuery,
  useGetLaundryItemsQuery,
  useGetWashingByIdQuery,
  usePatchWashingMutation,
} from '@entities/laundry';
import { useGetConsumablesQuery } from '@entities/consumable';
import { mapToOptions } from '@shared/lib';
import { useNavigate } from 'react-router-dom';

import s from './UpdateWashingForm.module.scss';

interface UpdateWashingFormProps {
  id: number;
}

const statusOptions = [
  { label: 'Новая', value: 'new' },
  { label: 'В процессе', value: 'in_progress' },
  { label: 'Завершено', value: 'finished' },
  { label: 'Отменено', value: 'canceled' },
];

export const UpdateWashingForm: React.FC<UpdateWashingFormProps> = ({ id }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: washing, isLoading: isWashingLoading } =
    useGetWashingByIdQuery(id);
  const { data: staff = [], isLoading: isStaffLoading } =
    useGetCleaningWorkersQuery();
  const { data: laundryItems = [], isLoading: isItemsLoading } =
    useGetLaundryItemsQuery('laundry');
  const { data: consumables = [], isLoading: isConsumablesLoading } =
    useGetConsumablesQuery();
  const [patchWashing, { isLoading: isUpdating }] = usePatchWashingMutation();

  const back = () => navigate('/laundry/washings');

  useEffect(() => {
    if (washing) {
      form.setFieldsValue({
        laundry_personal_id: washing.laundry_personal?.id,
        status: washing.status,
        items: washing.items.map((i) => ({
          item_id: i.item.id,
          quantity: i.quantity,
        })),
        consumables_list: Array.isArray(washing.consumables)
          ? washing.consumables.map((c: any) => ({
              id: c.id,
              quantity: c.quantity,
              unit: c.unit,
            }))
          : [],
      });
    }
  }, [washing, form]);

  const onFinish = async (values: any) => {
    try {
      await patchWashing({
        id,
        ...values,
      }).unwrap();
      message.success('Стирка успешно обновлена');
      back();
    } catch (error) {
      message.error('Ошибка при обновлении стирки');
    }
  };

  if (isWashingLoading) return <div>Загрузка...</div>;

  return (
    <div className={s.container}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        className={s.form}
        requiredMark={false}
      >
        <Form.Item
          name='laundry_personal_id'
          label='Клининг персонал'
          rules={[{ required: true, message: 'Выберите персонал' }]}
        >
          <SelectWithSearch
            placeholder='Выберите персонал'
            options={mapToOptions(staff)}
            loading={isStaffLoading}
          />
        </Form.Item>

        <div className={s.section}>
          <div className={s.sectionTitle}>Предмет</div>
          <Form.List name='items'>
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className={s.itemRow}>
                    <Form.Item
                      {...restField}
                      name={[name, 'item_id']}
                      className={s.itemSelect}
                      rules={[{ required: true, message: 'Выберите предмет' }]}
                    >
                      <SelectWithSearch
                        placeholder='Выберите предмет'
                        options={mapToOptions(laundryItems)}
                        loading={isItemsLoading}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      className={s.itemQty}
                      rules={[{ required: true, message: 'Укажите кол-во' }]}
                    >
                      <InputNumber
                        min={0}
                        placeholder='5 шт'
                        style={{ width: '100%' }}
                        formatter={(value) => (value ? `${value} шт` : '')}
                        parser={(value) => value!.replace(' шт', '')}
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </div>

        <Form.Item
          name='status'
          label='Статус'
          rules={[{ required: true, message: 'Выберите статус' }]}
        >
          <SelectWithSearch
            placeholder='Выберите статус'
            options={statusOptions}
          />
        </Form.Item>

        <div className={s.section}>
          <div className={s.sectionTitle}>Расходники</div>
          <Form.List name='consumables_list'>
            {(fields, { add, remove }) => (
              <>
                <Form.Item name='consumable_id'>
                  <SelectWithSearch
                    placeholder='Выберите расходник'
                    options={mapToOptions(consumables)}
                    loading={isConsumablesLoading}
                    onChange={(val) => {
                      const consumable = consumables.find((c) => c.id === val);
                      if (consumable) {
                        add({
                          id: consumable.id,
                          quantity: 1,
                          // unit: consumable.unit,
                        });
                        form.setFieldValue('consumable_id', undefined);
                      }
                    }}
                  />
                </Form.Item>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className={s.consumableRow}>
                    <Form.Item
                      {...restField}
                      name={[name, 'id']}
                      className={s.consumableSelect}
                    >
                      <SelectWithSearch
                        placeholder='Расходник'
                        options={mapToOptions(consumables)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      className={s.consumableQty}
                    >
                      <InputNumber
                        min={0}
                        placeholder='100 г'
                        style={{ width: '100%' }}
                        addonAfter={form.getFieldValue([
                          'consumables_list',
                          name,
                          'unit',
                        ])}
                      />
                    </Form.Item>
                    <button
                      type='button'
                      className={s.deleteBtn}
                      onClick={() => remove(name)}
                    >
                      <DeleteRedIcon />
                    </button>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </div>

        <div className={s.actions}>
          <Button variant='primary' htmlType='submit' isLoading={isUpdating}>
            Сохранить изменения
          </Button>
          <Button variant='outlined_big' htmlType='button' onClick={back}>
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
