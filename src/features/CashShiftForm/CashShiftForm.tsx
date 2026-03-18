import { Form, message } from 'antd';
import {
  type ICashShift,
  useCreateCashShiftMutation,
  useGetAllCashesQuery,
  useGetAllCashShiftsQuery,
  usePatchCashShiftMutation,
} from '@entities/cash';
import { Button, SelectWithSearch } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import {
  CashShiftStatusOptions,
  getErrorMessage,
  mapToOptions,
} from '@shared/lib';

import styles from './CashShiftForm.module.scss';
import type { FC } from 'react';

interface ComponentProps {
  initialValues?: ICashShift;
}

export const CashShiftForm: FC<ComponentProps> = ({ initialValues }) => {
  const navigate = useNavigate();

  const { data: allCash, isLoading: isAllCashLoading } = useGetAllCashesQuery();
  const { data: allShifts, isLoading: isAllCashShidtsLoading } =
    useGetAllCashShiftsQuery();

  const [createCashShift, { isLoading: isCreateLoading }] =
    useCreateCashShiftMutation();
  const [patchCashShift, { isLoading: isPatchLoading }] =
    usePatchCashShiftMutation();

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
        await patchCashShift({ id: initialValues.id, ...payload }).unwrap();
        message.success('Смена успешно обновлена');
      } else {
        await createCashShift(payload).unwrap();
        message.success('Смена успешно создана');
      }
      navigate(-1);
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.container}>
      <Form
        layout='vertical'
        initialValues={initialValues}
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item label='Касса' name='cashbox'>
          <SelectWithSearch
            allowClear
            placeholder='Выберите кассу'
            loading={isAllCashLoading}
            options={mapToOptions(allCash)}
          />
        </Form.Item>

        <Form.Item label='Смена' name='shift'>
          <SelectWithSearch
            allowClear
            placeholder='Выберите смену'
            loading={isAllCashShidtsLoading}
            options={mapToOptions(allShifts)}
          />
        </Form.Item>

        <Form.Item label='Статус' name='status'>
          <SelectWithSearch
            allowClear
            placeholder='Выберите статус'
            options={CashShiftStatusOptions}
          />
        </Form.Item>

        <Form.Item label='Открыл' name='status'>
          <SelectWithSearch
            allowClear
            placeholder='Выберите кто открыл кассу'
            options={CashShiftStatusOptions}
          />
        </Form.Item>

        <Form.Item label='Закрыл' name='status'>
          <SelectWithSearch
            allowClear
            placeholder='Выберите кто закрыл кассу'
            options={CashShiftStatusOptions}
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
