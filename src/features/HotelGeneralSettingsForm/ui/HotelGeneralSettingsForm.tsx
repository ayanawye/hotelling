import React, { useEffect } from 'react';
import { Form, Input, message, Switch, Upload } from 'antd';
import {
  useGetHotelSettingsQuery,
  useUpdateHotelSettingsMutation,
} from '@entities/hotel';
import { Button } from '@shared/ui';
import styles from './HotelGeneralSettingsForm.module.scss';
import { UploadIcon } from '@shared/assets';
import { getErrorMessage } from '@shared/lib';

interface HotelGeneralSettingsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const HotelGeneralSettingsForm: React.FC<
  HotelGeneralSettingsFormProps
> = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();

  const { data: settings, isLoading: isFetching } = useGetHotelSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateHotelSettingsMutation();

  useEffect(() => {
    if (settings) {
      form.setFieldsValue(settings);
    }
  }, [settings, form]);

  const onFinish = async (values: any) => {
    try {
      await updateSettings(values).unwrap();
      message.success('Настройки успешно сохранены');
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  if (isFetching) return null;

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        className={styles.form}
        requiredMark={false}
      >
        <div>
          <span className={styles.label}>Логотип отеля</span>
          <Upload.Dragger
            name='logo'
            multiple={false}
            showUploadList={false}
            className={styles.uploadDragger}
            disabled={isUpdating}
          >
            {settings?.logo ? (
              <img
                src={settings.logo}
                alt='Hotel Logo'
                className={styles.logoImage}
              />
            ) : (
              <>
                <UploadIcon />
                <p className={styles.uploadTitle}>
                  Добавить <br />
                  логотип отеля
                </p>
                <div className={styles.uploadHint}>
                  PNG, JPG или SVG · до 2 МБ
                  <br />
                  Рекомендуемый размер: 512×512
                </div>
              </>
            )}
          </Upload.Dragger>
        </div>

        <div className={styles.row}>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Введите название отеля' }]}
          >
            <Input
              size='large'
              placeholder='Название отеля'
              variant='borderless'
            />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            name='address'
            rules={[{ required: true, message: 'Введите адрес отеля' }]}
          >
            <Input
              size='large'
              placeholder='Адрес отеля'
              variant='borderless'
            />
          </Form.Item>
        </div>

        <Form.Item name='notifications_enabled' valuePropName='checked'>
          <div className={styles.switchWrapper}>
            <Switch />
            <span>Уведомления</span>
          </div>
        </Form.Item>

        <div className={styles.actions}>
          <Button
            variant='primary_big'
            htmlType='submit'
            isLoading={isUpdating}
            className={styles.saveButton}
          >
            Сохранить
          </Button>
          <Button
            htmlType='button'
            variant='outlined_big'
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
