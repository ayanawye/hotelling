import { DatePicker, Form, Input, message, theme, TimePicker } from 'antd';
import type { CSSProperties, FC } from 'react';
import { useEffect, useMemo } from 'react';

import styles from './BookingForm.module.scss';
import { Button, SelectWithSearch } from '@shared/ui';
import type {
  Booking,
  ICreateBookingRequest,
} from '@entities/booking/api/bookingApi';
import {
  useCreateBookingMutation,
  useFetchRoomStocksQuery,
  useUpdateBookingMutation,
} from '@entities/booking/api/bookingApi';
import { useGetHotelRoomsTypesQuery } from '@entities/rooms/api/roomsTypeApi';
import { useGetHotelRoomsStatusQuery } from '@entities/rooms/api/roomsStatus.ts';
import {
  GUARANTEE_TYPE_LABELS,
  GUESTS_LANGUAGE,
  GUESTS_TITLE,
  mapToOptions,
} from '@shared/lib';
import dayjs from 'dayjs';
import { getErrorMessage } from '@shared/lib';

interface BookingFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  initialData?: Booking;
}

export const BookingForm: FC<BookingFormProps> = ({
  onCancel,
  onSuccess,
  initialData,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();

  const isSubmitting = isCreating || isUpdating;
  const isEdit = !!initialData;

  const { data: roomsData, isLoading: isRoomsLoading } =
    useFetchRoomStocksQuery();
  const { data: roomTypesData, isLoading: isRoomTypesLoading } =
    useGetHotelRoomsTypesQuery();
  const { data: roomStatusesData, isLoading: isRoomStatusesLoading } =
    useGetHotelRoomsStatusQuery();

  const roomOptions = useMemo(
    () => mapToOptions(roomsData, 'room_number'),
    [roomsData],
  );
  const roomTypeOptions = useMemo(
    () => mapToOptions(roomTypesData),
    [roomTypesData],
  );
  const roomStatusOptions = useMemo(
    () => mapToOptions(roomStatusesData),
    [roomStatusesData],
  );

  const titulOptions = Object.entries(GUESTS_TITLE).map(([value, label]) => ({
    label,
    value,
  }));

  const guestCategoryOptions = [
    { label: 'VIP', value: 'middle_manager' },
    { label: 'Обычный', value: 'regular' },
  ];

  const languageOptions = Object.entries(GUESTS_LANGUAGE).map(
    ([value, label]) => ({
      label,
      value,
    }),
  );

  const countOptions = Array.from({ length: 11 }, (_, i) => ({
    label: String(i),
    value: i,
  }));

  const nightOptions = Array.from({ length: 31 }, (_, i) => ({
    label: String(i),
    value: i,
  }));

  const guaranteeOptions = Object.entries(GUARANTEE_TYPE_LABELS).map(
    ([value, label]) => ({
      label,
      value,
    }),
  );

  const themeVars = {
    '--bg-container': token.colorBgContainer,
    '--border-radius': `${token.borderRadiusLG}px`,
    '--border-color': token.colorBorderSecondary,
  } as CSSProperties;

  const onFinish = async (values: any) => {
    try {
      const arrivalDate = values.check_in_date;
      const arrivalTime = values.check_in_time || dayjs().startOf('day');
      const arrival_datetime = arrivalDate
        .hour(arrivalTime.hour())
        .minute(arrivalTime.minute())
        .second(0)
        .millisecond(0)
        .toISOString();

      const departureDate = values.check_out_date;
      const departureTime = values.check_out_time || dayjs().startOf('day');
      const departure_datetime = departureDate
        .hour(departureTime.hour())
        .minute(departureTime.minute())
        .second(0)
        .millisecond(0)
        .toISOString();

      const body: ICreateBookingRequest = {
        guest: {
          first_name: values.guest.first_name,
          last_name: values.guest.last_name,
          middle_name: values.guest.third_name || '',
          email: values.guest.email,
          phone: values.guest.phone,
          title: values.titul,
          language: values.language,
          guest_category: values.guestCategory,
        },
        rooms: values.rooms,
        guarantee_type: values.guarantee_type,
        arrival_datetime,
        departure_datetime,
        nights: values.nights,
        adults: values.adults,
        children: values.children,
        infants: values.infants,
      };

      if (isEdit && initialData?.id) {
        await updateBooking({ id: initialData.id, body }).unwrap();
      } else {
        await createBooking(body).unwrap();
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        guest: {
          first_name: initialData.guest?.first_name,
          last_name: initialData.guest?.last_name,
          third_name: initialData.guest?.middle_name,
          email: initialData.guest?.email,
          phone: initialData.guest?.phone,
        },
        titul: initialData.guest?.title,
        language: initialData.guest?.language,
        guestCategory: initialData.guest?.guest_category,
        rooms:
          initialData.rooms || (initialData.room ? [initialData.room] : []),
        guarantee_type: initialData.guarantee_type,
        check_in_date: initialData.arrival_datetime
          ? dayjs(initialData.arrival_datetime)
          : undefined,
        check_in_time: initialData.arrival_datetime
          ? dayjs(initialData.arrival_datetime)
          : undefined,
        check_out_date: initialData.departure_datetime
          ? dayjs(initialData.departure_datetime)
          : undefined,
        check_out_time: initialData.departure_datetime
          ? dayjs(initialData.departure_datetime)
          : undefined,
        nights: initialData.nights,
        adults: initialData.adults,
        children: initialData.children,
        infants: initialData.infants,
      });
    }
  }, [initialData, form]);

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
          nights: 1,
          rooms: [],
          check_in_time: dayjs('14:00', 'HH:mm'),
          check_out_time: dayjs('12:00', 'HH:mm'),
        }}
      >
        <div className={styles.section}>
          <div className={styles.row}>
            <Form.Item
              name={['guest', 'last_name']}
              label='Фамилия'
              rules={[{ required: true, message: 'Введите фамилию' }]}
              className={`${styles.formItem} ${styles.flex1}`}
            >
              <Input size='large' variant='borderless' placeholder='Иванов' />
            </Form.Item>
            <Form.Item
              name={['guest', 'first_name']}
              label='Имя'
              rules={[{ required: true, message: 'Введите имя' }]}
              className={`${styles.formItem} ${styles.flex1}`}
            >
              <Input size='large' variant='borderless' placeholder='Иван' />
            </Form.Item>
            <Form.Item
              name={['guest', 'third_name']}
              label='Отчество'
              rules={[{ required: false, message: 'Введите отчество' }]}
              className={`${styles.formItem} ${styles.flex1}`}
            >
              <Input size='large' variant='borderless' placeholder='Иванович' />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['titul']}
              label='Титул'
              rules={[{ required: true, message: 'Выберите титул' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Выберите титул'
                options={titulOptions}
              />
            </Form.Item>
            <Form.Item
              name={['guestCategory']}
              label='Категория гостя'
              rules={[{ required: true, message: 'Выберите категорию' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Выберите категорию'
                options={guestCategoryOptions}
              />
            </Form.Item>
            <Form.Item
              name={['language']}
              label='Язык'
              rules={[{ required: true, message: 'Язык' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Выберите язык'
                options={languageOptions}
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['adults']}
              label='Взрослые'
              rules={[{ required: true, message: 'Укажите количество' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Укажите количество'
                options={countOptions}
              />
            </Form.Item>
            <Form.Item
              name={['children']}
              label='Дети'
              rules={[{ required: true, message: 'Укажите количество' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Укажите количество'
                options={countOptions}
              />
            </Form.Item>
            <Form.Item
              name={['infants']}
              label='Младенцы'
              rules={[{ required: true, message: 'Укажите количество' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Укажите количество'
                options={countOptions}
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['rooms']}
              label='Номер'
              rules={[{ required: true, message: 'Выберите номер' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                mode='multiple'
                placeholder='Выберите номер'
                options={roomOptions}
                loading={isRoomsLoading}
              />
            </Form.Item>
            <Form.Item
              name={['room_type']}
              label='Тип номера'
              rules={[{ required: true, message: 'Укажите тип номера' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Тип номера'
                options={roomTypeOptions}
                loading={isRoomTypesLoading}
              />
            </Form.Item>
            <Form.Item
              name={['status']}
              label='Статус'
              rules={[{ required: true, message: 'Укажите статус' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Укажите статус'
                options={roomStatusOptions}
                loading={isRoomStatusesLoading}
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <div className={styles.dateTimeWrapper}>
              <Form.Item
                name={['check_in_date']}
                label='Дата и время заезда'
                rules={[{ required: true, message: 'Укажите дату заезда' }]}
                className={`${styles.formItem} ${styles.datePicker} ${styles.select}`}
              >
                <DatePicker
                  size='large'
                  format='DD.MM.YYYY'
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name={['check_in_time']}
                label=' '
                className={`${styles.formItem} ${styles.timePicker} ${styles.select}`}
              >
                <TimePicker
                  size='large'
                  format='HH:mm'
                  suffixIcon={null}
                  style={{ width: '100%' }}
                  placeholder='00:00'
                />
              </Form.Item>
            </div>
            <div className={styles.dateTimeWrapper}>
              <Form.Item
                name={['check_out_date']}
                label='Дата и время выезда'
                rules={[{ required: true, message: 'Укажите дату выезда' }]}
                className={`${styles.formItem} ${styles.datePicker} ${styles.select}`}
              >
                <DatePicker
                  size='large'
                  format='DD.MM.YYYY'
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name={['check_out_time']}
                label=' '
                className={`${styles.formItem} ${styles.timePicker} ${styles.select}`}
              >
                <TimePicker
                  size='large'
                  format='HH:mm'
                  suffixIcon={null}
                  style={{ width: '100%' }}
                  placeholder='00:00'
                />
              </Form.Item>
            </div>
            <Form.Item
              name={['nights']}
              label='Кол-во ночей'
              rules={[{ required: true, message: 'Укажите кол-во ночей' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Укажите кол-во ночей'
                options={nightOptions}
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name={['guarantee_type']}
              label='Тип гарантии'
              rules={[{ required: true, message: 'Выберите тип гарантии' }]}
              className={`${styles.formItem} ${styles.select} ${styles.flex1}`}
            >
              <SelectWithSearch
                size='large'
                placeholder='Выберите тип гарантии'
                options={guaranteeOptions}
              />
            </Form.Item>
          </div>

          <div className={styles.lastRow}>
            <Form.Item
              name={['guest', 'email']}
              label='Электронная почта'
              rules={[
                {
                  required: false,
                  type: 'email',
                  message: 'Введите корректный email',
                },
              ]}
              className={`${styles.formItem} ${styles.flex1}`}
            >
              <Input
                size='large'
                variant='borderless'
                placeholder='aidar993@gmail.com'
              />
            </Form.Item>
            <Form.Item
              name={['guest', 'phone']}
              label='Номер телефона'
              rules={[{ required: false, message: 'Введите номер телефона' }]}
              className={`${styles.formItem} ${styles.flex1}`}
            >
              <Input
                size='large'
                variant='borderless'
                placeholder='+7 546 345 210'
              />
            </Form.Item>
            <div className={styles.flex1} />
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            variant='primary_big'
            htmlType='submit'
            className={styles.btn}
            isLoading={isSubmitting}
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
          <Button
            variant='outlined_big'
            onClick={onCancel}
            className={styles.btn}
          >
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
