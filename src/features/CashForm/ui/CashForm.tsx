import { Form, Input, message, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetFinanceCurrenciesQuery } from '@entities/finance';
import {
  type ICash,
  useCreateCashMutation,
  usePatchCashMutation,
} from '@entities/cash';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import styles from './CashForm.module.scss';
import { Button, SelectWithSearch } from '@shared/ui';
import type { FC } from 'react';

interface ComponentProps {
  initialValues?: ICash;
}

export const CashForm: FC<ComponentProps> = ({ initialValues }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetFinanceCurrenciesQuery({ is_active: true });

  const [createCash, { isLoading: isCreateLoading }] = useCreateCashMutation();
  const [patchCash, { isLoading: isPatchLoading }] = usePatchCashMutation();

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        allowed_currency_ids: values.allowed_currencies.map((el: string) =>
          Number(el),
        ),
      };

      delete payload.allowed_currencies;

      if (initialValues?.id) {
        await patchCash({ id: initialValues.id, ...payload }).unwrap();
        message.success('Касса успешно обновлена');
      } else {
        await createCash(payload).unwrap();
        message.success('Касса успешно создана');
      }
      navigate(-1);
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
        initialValues={
          initialValues
            ? {
                ...initialValues,
                allowed_currencies: initialValues.allowed_currencies?.map(
                  (c) => c.id,
                ),
              }
            : {}
        }
        className={styles.form}
      >
        <Form.Item
          label='Название'
          name='name'
          rules={[{ required: true, message: 'Введите название кассы' }]}
        >
          <Input placeholder='Введите название кассы' />
        </Form.Item>

        <Form.Item label='Описание' name='description'>
          <Input.TextArea placeholder='Text area' rows={4} />
        </Form.Item>

        <Form.Item name='is_active' valuePropName='checked'>
          <div className={styles.switchRow}>
            <Switch />
            <span>Активна</span>
          </div>
        </Form.Item>

        <Form.Item label='Валюты' name='allowed_currencies'>
          <SelectWithSearch
            allowClear
            mode='multiple'
            placeholder='Выберите валюту'
            loading={isCurrenciesLoading}
            options={mapToOptions(currencies)}
          />
        </Form.Item>

        <div className={styles.actions}>
          <Button
            variant='primary_big'
            htmlType='submit'
            isLoading={isCreateLoading || isPatchLoading}
          >
            {initialValues ? 'Сохранить' : 'Создать'}
          </Button>
          <Button
            htmlType='button'
            variant='outlined_big'
            onClick={() => navigate(-1)}
          >
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
