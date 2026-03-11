import {
  Alert,
  Collapse,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Typography,
} from 'antd';
import styles from './DetailPage.module.scss';
import { useParams } from 'react-router-dom';
import {
  useGetGuestByIdQuery,
  useGetGuestPassportQuery,
} from '@entities/guests';
import {
  GUESTS_LANGUAGE,
  GUESTS_TITLE,
  RESERVATION_STATUS_CONFIG,
} from '@shared/lib';
import type { ColumnsType } from 'antd/es/table';
import type { IReservation } from '@shared/types/IBooking';
import { useState } from 'react';
import dayjs from 'dayjs';
import { PageLoader } from '@shared/ui';

const { Text } = Typography;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: guest, isLoading: isGuestLoading } = useGetGuestByIdQuery(
    Number(id),
  );
  const { data: passport, isLoading: isPassportLoading } =
    useGetGuestPassportQuery(Number(id));
  const [expandedFolio, setExpandedFolio] = useState<number | null>(null);

  if (isGuestLoading || isPassportLoading) {
    return <PageLoader />;
  }

  if (!guest) {
    return <Alert title='Ошибка загрузки гостей' type='error' />;
  }

  const columns: ColumnsType<IReservation> = [
    {
      title: 'Заезд',
      dataIndex: 'arrival_datetime',
      key: 'arrival_datetime',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Выезд',
      dataIndex: 'departure_datetime',
      key: 'departure_datetime',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Номер',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Тариф',
      dataIndex: 'rate_plan',
      key: 'rate_plan',
      render: () => 'Стандарт',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: keyof typeof RESERVATION_STATUS_CONFIG) => {
        const config = RESERVATION_STATUS_CONFIG[status];
        return (
          <Tag
            color={config.bgColor}
            style={{ color: config.textColor, border: 'none' }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: 'Сумма',
      key: 'total_amount',
      render: (_, record) => {
        const total = record.folio_transactions.reduce(
          (acc, curr) => acc + curr.amount,
          0,
        );
        return `${total.toLocaleString()} KGS`;
      },
    },
    {
      title: 'Фолио',
      key: 'folio',
      render: (_, record) => (
        <a
          onClick={() =>
            setExpandedFolio(expandedFolio === record.id ? null : record.id)
          }
        >
          {expandedFolio === record.id ? 'Закрыть фолио' : 'Открыть фолио'}
        </a>
      ),
    },
  ];

  const renderFolioDetails = (reservation: IReservation) => {
    const totalAmount = reservation.folio_transactions.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );

    return (
      <div className={styles.folioDetails}>
        <div className={styles.folioSection}>
          <Text strong className={styles.folioLabel}>
            Фолио проживания
          </Text>
          <div className={styles.folioInfo}>
            <p>Тариф</p>
            <p>Индивидуальный - 40 000.00</p>
          </div>
          <div className={styles.folioInfo}>
            <p>Скидки</p>
            <p>VIP - 10%</p>
          </div>
          <hr className={styles.divider} />
          <div className={styles.folioInfo}>
            <Text type='secondary'>Заезд</Text>
            <Text type='secondary'>
              Ранний заезд: <span>1000.00</span>
            </Text>
            <Text type='secondary'>
              Поздний выезд: <span>1000.00</span>
            </Text>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.folioSection}>
          <Text strong className={styles.folioLabel}>
            Услуги
          </Text>
          <Table
            dataSource={reservation.folio_transactions}
            pagination={false}
            size='small'
            showHeader={false}
            className={styles.servicesTable}
            columns={[
              {
                title: 'Название',
                dataIndex: 'title',
                key: 'title',
                width: '40%',
              },
              {
                title: 'Кол-во',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '10%',
                align: 'center',
              },
              {
                title: 'Сумма',
                dataIndex: 'amount',
                key: 'amount',
                width: '30%',
                align: 'right',
                render: (val) => val.toLocaleString(),
              },
              {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status',
                width: '20%',
                align: 'right',
                render: (status) => {
                  const isPaid = status === 'paid'; // Adjust based on real data if possible, or just default as before
                  return (
                    <Tag
                      color={isPaid ? '#E6F9F0' : '#F0F0F0'}
                      style={{
                        color: isPaid ? '#00B368' : '#8C8C8C',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '14px',
                        margin: 0,
                      }}
                    >
                      {isPaid ? 'Оплачено' : 'Не оплачено'}
                    </Tag>
                  );
                },
              },
            ]}
          />
        </div>

        <div className={styles.folioFooter}>
          <div>
            <Text type='secondary'>Дата создания: </Text>{' '}
            {dayjs(reservation.arrival_datetime).format('DD.MM.YYYY')} <br />
            <Text type='secondary'>Время создания: </Text> 14:10 <br />
            <Text type='secondary'>Создал: </Text> Иванов Иван
          </div>
          <div className={styles.totalPrice}>
            <Text type='secondary'>Полная сумма:</Text>
            <div className={styles.priceValue}>
              {totalAmount.toLocaleString()} RUB
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Form layout='vertical' disabled>
        <div className={styles.row}>
          <Form.Item label='Имя'>
            <Input value={guest.first_name} />
          </Form.Item>
          <Form.Item label='Фамилия'>
            <Input value={guest.last_name} />
          </Form.Item>
        </div>
        <Form.Item label='Отчество'>
          <Input value={guest.middle_name} />
        </Form.Item>
        <div className={styles.row}>
          <Form.Item label='Язык'>
            <Input value={GUESTS_LANGUAGE[guest.language]} />
          </Form.Item>
          <Form.Item label='Титул'>
            <Input value={GUESTS_TITLE[guest.title]} />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item label='Электронная почта'>
            <Input value={guest.email} />
          </Form.Item>

          <Form.Item label='Номер телефона'>
            <Input value={guest.phone} />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item label='Гражданство'>
            <Input value={guest.citizenship} />
          </Form.Item>

          <Form.Item label='Категория гостя'>
            <Input value={guest.guest_category || 'Постоянный гость'} />
          </Form.Item>
        </div>
        <Form.Item label='Статус'>
          <Select
            value='active'
            options={[{ value: 'active', label: 'Активный заселен' }]}
          />
        </Form.Item>
        <Form.Item label='Комментарий'>
          <Input.TextArea rows={2} value={guest.comment} />
        </Form.Item>
      </Form>

      <Collapse
        className={styles.collapse}
        defaultActiveKey={['1']}
        expandIconPlacement={'end'}
        items={[
          {
            key: '1',
            label: 'История проживаний',
            children: (
              <Table
                columns={columns}
                dataSource={guest.reservations}
                pagination={false}
                rowKey='id'
                expandable={{
                  expandedRowRender: renderFolioDetails,
                  rowExpandable: (record) => record.id === expandedFolio,
                  expandedRowKeys: expandedFolio ? [expandedFolio] : [],
                  showExpandColumn: false,
                }}
              />
            ),
          },
        ]}
      />

      {passport && (
        <Collapse
          className={styles.collapse_passport}
          defaultActiveKey={['1']}
          expandIconPlacement={'end'}
          items={[
            {
              key: '1',
              label: 'Паспортные данные',
              children: (
                <div className={styles.passport}>
                  <div className={styles.passportContent}>
                    <Text strong>Паспорт</Text>
                    <div className={styles.passportImages}>
                      <div className={styles.passportImageContainer}>
                        <p>Лицевая сторона</p>
                        <img
                          src={passport?.photo_front || ''}
                          alt='Front side'
                        />
                      </div>
                      <hr className={styles.divider} />
                      <div className={styles.passportImageContainer}>
                        <p>Обратная сторона</p>
                        <img src={passport?.photo_back || ''} alt='Back side' />
                      </div>
                    </div>
                  </div>
                  <div className={styles.passportContent}>
                    <Text>Данные паспорта</Text>
                    <Form
                      layout='vertical'
                      disabled
                      className={styles.passportForm}
                    >
                      <div className={styles.row}>
                        <Form.Item label='Серия'>
                          <Input value={passport?.series} />
                        </Form.Item>
                        <Form.Item label='Номер'>
                          <Input value={passport?.number} />
                        </Form.Item>
                      </div>
                      <Form.Item
                        label='Персональный номер'
                        className={styles.fullWidth}
                      >
                        <Input value={passport?.personal_number} />
                      </Form.Item>
                      <Form.Item label='Пол' className={styles.fullWidth}>
                        <Input value={passport?.sex} />
                      </Form.Item>
                      <div className={styles.row}>
                        <Form.Item label='Дата рождения'>
                          <Input
                            value={
                              passport?.birth_date
                                ? dayjs(passport.birth_date).format(
                                    'DD.MM.YYYY',
                                  )
                                : ''
                            }
                          />
                        </Form.Item>
                        <Form.Item label='Место рождения'>
                          <Input value={passport?.birth_place} />
                        </Form.Item>
                      </div>
                      <Form.Item
                        label='Национальность'
                        className={styles.fullWidth}
                      >
                        <Input value={passport?.nationality} />
                      </Form.Item>
                      <Form.Item
                        label='Дата истечения срока паспорта'
                        className={styles.fullWidth}
                      >
                        <Input
                          value={
                            passport?.expiry_date
                              ? dayjs(passport.expiry_date).format('YYYY-MM-DD')
                              : ''
                          }
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default DetailPage;
