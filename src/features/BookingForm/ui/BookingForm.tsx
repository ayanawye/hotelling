import { Button, Form, Input, theme } from 'antd';
import React, { type FC } from 'react';

import styles from './BookingForm.module.scss';
import { SelectWithSearch } from '@shared/ui';
// import { mapToOptions } from '@shared/lib';

// const { Title } = Typography;
// const { RangePicker } = DatePicker;

interface BookingFormProps {
  onCancel?: () => void;
  onFinish?: (values: any) => void;
}

export const BookingForm: FC<BookingFormProps> = ({ onCancel, onFinish }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  // const { data: rooms } = useFetchRoomStocksQuery();

  const themeVars = {
    '--bg-container': token.colorBgContainer,
    '--border-radius': `${token.borderRadiusLG}px`,
    '--border-color': token.colorBorderSecondary,
  } as React.CSSProperties;

  return (
    <div className={styles.container} style={themeVars}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          adults: 1,
          children: 0,
          infants: 0,
        }}
      >
        <div className={styles.section}>
          <div className={styles.row}>
            <Form.Item
              name={['guest', 'last_name']}
              label='Фамилия'
              rules={[{ required: true, message: 'Введите фамилию' }]}
              className={styles.formItem}
            >
              <Input size='large' variant='borderless' placeholder='Иванов' />
            </Form.Item>
            <Form.Item
              name={['guest', 'first_name']}
              label='Имя'
              rules={[{ required: true, message: 'Введите имя' }]}
              className={styles.formItem}
            >
              <Input size='large' variant='borderless' placeholder='Иван' />
            </Form.Item>
            <Form.Item
              name={['guest', 'third_name']}
              label='Отчество'
              rules={[{ required: false, message: 'Введите отчество' }]}
              className={styles.formItem}
            >
              <Input size='large' variant='borderless' placeholder='Иванович' />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name={['guestCategory']}
              label='Категория гостя'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name={['language']}
              label='Язык'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Введите номер титул' }]}
              className={`${styles.formItem} ${styles.select}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Название корпуса'
                options={[]}
              />
            </Form.Item>
          </div>
        </div>

        <div className={styles.footer}>
          <Button onClick={onCancel}>Отмена</Button>
          <Button type='primary' htmlType='submit'>
            Забронировать
          </Button>
        </div>
      </Form>
    </div>
  );
};
