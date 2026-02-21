import React, { useEffect, useState } from 'react';
import { Form, Input, message, Spin, Upload } from 'antd';
import { Button, SelectWithSearch } from '@shared/ui';
import styles from './ConsumableForm.module.scss';
import { UploadIcon } from '@shared/assets';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import {
  IConsumable,
  useCreateConsumableMutation,
  useGetConsumableCategoriesQuery,
  usePatchConsumableMutation,
} from '@entities/consumable';
import { getChangedFields } from '@shared/utils';

interface ComponentProps {
  initialValues?: IConsumable;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ConsumableForm: React.FC<ComponentProps> = ({
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [logo, setLogo] = useState<File | null>(null);
  const [showedLogo, setShowedLogo] = useState<string | undefined>(
    settings?.logo,
  );

  const { data: categories } = useGetConsumableCategoriesQuery();
  const [createItem, { isLoading: isCreating }] = useCreateConsumableMutation();
  const [patchItem, { isLoading: isUpdating }] = usePatchConsumableMutation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category_id: initialValues.category.id,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleChangeLogo = (info: any) => {
    const file = info.file;

    if (!file) return;

    setLogo(info.file);
    setShowedLogo(URL.createObjectURL(file));
  };

  const onFinish = async (values: any) => {
    values.logo = logo;
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        await patchItem({ id: initialValues.id, ...changedValues }).unwrap();

        if (!changedValues) {
          message.info('Нет изменений');
          return;
        }

        message.success('Успешно обновлен');
      } else {
        await createItem(values).unwrap();
        message.success('Успешно создано');
      }
      onSuccess?.();
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <Spin size='large' />;
  }

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
          <span className={styles.label}>Расходник</span>
          <Upload.Dragger
            name='logo'
            multiple={false}
            showUploadList={false}
            className={styles.uploadDragger}
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
            label='Название'
            rules={[{ required: true, message: 'Введите название расходника' }]}
          >
            <Input
              size='large'
              placeholder='Введите название расходника'
              variant='borderless'
            />
          </Form.Item>
          <Form.Item
            name={'category_id'}
            label='Категория'
            rules={[
              { required: true, message: 'Выберите категорию расходника' },
            ]}
          >
            <SelectWithSearch
              placeholder='Выберите категорию расходника'
              options={mapToOptions(categories)}
              variant='borderless'
            />
          </Form.Item>
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
