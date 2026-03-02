import React, { useEffect } from 'react';
import { Form, Input, message, Select } from 'antd';
import { type IPersonal, useCreateStaffMutation, usePatchStaffMutation, } from '@entities/staff';
import { Button } from '@shared/ui';
import { getErrorMessage, STAFF_ROLE } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import styles from './StaffForm.module.scss';

interface StaffFormProps {
  initialValues?: IPersonal;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const StaffForm: React.FC<StaffFormProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
  const [patchStaff, { isLoading: isUpdating }] = usePatchStaffMutation();

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
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        // if (changedValues) {
        //   delete changedValues.password;
        //   delete changedValues.confirm_password;
        // }

        if (!changedValues || Object.keys(changedValues).length === 0) {
          message.info('Нет изменений');
          return;
        }

        await patchStaff({
          id: initialValues.id,
          ...changedValues,
        }).unwrap();

        message.success('Сотрудник успешно обновлен');
      } else {
        await createStaff(values).unwrap();
        message.success('Сотрудник успешно создан');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  const roleOptions = Object.entries(STAFF_ROLE).map(([value, label]) => ({
    value,
    label,
  }));

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
            name='full_name'
            label='ФИО'
            rules={[{ required: true, message: 'Введите ФИО персонала' }]}
          >
            <Input placeholder='Введите ФИО персонала' variant='borderless' />
          </Form.Item>
          <Form.Item
            name='phone_number'
            label='Номер телефона'
            rules={[
              { required: true, message: 'Введите номер телефона' },
              {
                pattern: /^\+\d+$/,
                message: "Номер должен начинаться с '+'",
              },
            ]}
          >
            <Input placeholder='Введите номер телефона' variant='borderless' />
          </Form.Item>
        </div>

        <Form.Item
          name='role'
          label='Роль'
          className={styles.fullWidth}
          rules={[{ required: true, message: 'Выберите роль' }]}
        >
          <Select
            placeholder='Выберите роль'
            variant='borderless'
            options={roleOptions}
          />
        </Form.Item>

        <Form.Item
          name='username'
          label='Имя пользователя'
          className={styles.fullWidth}
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input placeholder='Введите имя пользователя' variant='borderless' />
        </Form.Item>

        {!initialValues && (
          <div className={styles.row}>
            <Form.Item
              name='password'
              label='Пароль'
              rules={[{ required: !isEdit, message: 'Введите пароль' }]}
            >
              <Input.Password
                placeholder='Введите пароль'
                variant='borderless'
              />
            </Form.Item>
            <Form.Item
              name='password_confirm'
              label='Повторить пароль'
              dependencies={['password']}
              rules={[
                { required: !isEdit, message: 'Повторите пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder='Повторите пароль'
                variant='borderless'
              />
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
