import React, { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Form,
  Input,
  message,
  Radio,
  Select,
  Switch,
  Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  type ILaundryItem,
  useCreateLaundryItemMutation,
  useGetLaundryItemCategoriesQuery,
  usePatchLaundryItemMutation,
} from '@entities/laundry';
import { Button } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import { UploadIcon } from '@shared/assets';

import styles from './LaundryItemForm.module.scss';

interface LaundryItemFormProps {
  initialValues?: ILaundryItem;
}

export const LaundryItemForm: React.FC<LaundryItemFormProps> = ({
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [logo, setLogo] = useState<File | null>(null);
  const [showedLogo, setShowedLogo] = useState<string | undefined>(
    initialValues?.item_image,
  );
  const navigate = useNavigate();

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetLaundryItemCategoriesQuery();
  const [createItem, { isLoading: isCreating }] =
    useCreateLaundryItemMutation();
  const [patchItem, { isLoading: isUpdating }] = usePatchLaundryItemMutation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category_id: initialValues.category?.id || initialValues.category_id,
      });
    }
  }, [initialValues, form]);

  const handleChangeLogo = (info: any) => {
    const file = info.file;

    if (!file) return;

    setLogo(info.file);
    setShowedLogo(URL.createObjectURL(file));
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();

    if (logo) {
      formData.append('item_image', logo);
    }

    if (values.name) {
      formData.append('name', values.name);
    }

    if (values.category_id) {
      formData.append('category_id', values.category_id);
    }

    if (values.item_type) {
      formData.append('item_type', values.item_type);
    }

    if (values.is_active) {
      formData.append('is_active', String(values.is_active));
    }

    try {
      if (initialValues) {
        let changedValues = getChangedFields(initialValues, values);
        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        await patchItem({ id: initialValues.id, body: formData }).unwrap();
        message.success('Предмет успешно обновлен');
      } else {
        await createItem(formData).unwrap();
        message.success('Предмет успешно создан');
      }
      navigate('/laundry/items');
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.uploadDragger}>
        <span className={styles.label}>Предмет</span>
        <Upload.Dragger
          name='logo'
          multiple={false}
          showUploadList={false}
          accept='image/png'
          disabled={isUpdating}
          beforeUpload={() => false}
          onChange={(info) => handleChangeLogo(info)}
        >
          {showedLogo ? (
            <img
              src={showedLogo}
              alt='Hotel Logo'
              className={styles.logoImage}
            />
          ) : (
            <div className={styles.uploadRecommend}>
              <UploadIcon />
              <p className={styles.uploadTitle}>Добавить картинку</p>
              <div className={styles.uploadHint}>
                PNG · до 2 МБ
                <br />
                Рекомендуемый размер: 80×80
              </div>
            </div>
          )}
        </Upload.Dragger>
      </div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{ is_active: true, item_type: 'laundry' }}
        className={styles.form}
      >
        <Form.Item
          name='category_id'
          label='Категория'
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select
            placeholder='Выберите категорию'
            loading={isCategoriesLoading}
            options={mapToOptions(categories)}
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='name'
          label='Предмет'
          rules={[{ required: true, message: 'Введите название предмета' }]}
        >
          <Input placeholder='Введите название предмета' size='large' />
        </Form.Item>

        <Form.Item
          name='item_type'
          label='Тип предмета'
          rules={[{ required: true, message: 'Выберите тип предмета' }]}
        >
          <ConfigProvider theme={{ token: { colorPrimary: '#00B368' } }}>
            <Radio.Group size='large'>
              <Radio value='laundry'>Для стирки</Radio>
              <Radio value='order'>Для заказа</Radio>
            </Radio.Group>
          </ConfigProvider>
        </Form.Item>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Статус</div>
          <Form.Item name='is_active' valuePropName='checked'>
            <div className={styles.switchRow}>
              <Switch />
              <span>Активна</span>
            </div>
          </Form.Item>
        </div>

        <div className={styles.actions}>
          <Button
            variant='primary_big'
            htmlType='submit'
            isLoading={isCreating || isUpdating}
          >
            {initialValues ? 'Сохранить' : 'Создать'}
          </Button>
          <Button
            htmlType='button'
            variant='outlined_big'
            onClick={() => navigate('/laundry/items')}
          >
            Отменить
          </Button>
        </div>
      </Form>
    </div>
  );
};
