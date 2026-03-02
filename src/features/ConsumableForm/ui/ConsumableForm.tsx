import React, { useEffect, useState } from 'react';
import { Form, Input, message, Upload } from 'antd';
import { Button, SelectWithSearch } from '@shared/ui';
import { getErrorMessage, mapToOptions } from '@shared/lib';
import { getChangedFields } from '@shared/utils';
import {
  type IConsumable,
  useCreateConsumableMutation,
  useGetConsumableCategoriesQuery,
  usePatchConsumableMutation,
} from '@entities/consumable';

import styles from './ConsumableForm.module.scss';
import { UploadIcon } from '@shared/assets';

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
    initialValues?.consumable_image,
  );

  const { data: allCategories } = useGetConsumableCategoriesQuery();
  const [createItem, { isLoading: isCreating }] = useCreateConsumableMutation();
  const [patchItem, { isLoading: isUpdating }] = usePatchConsumableMutation();

  const isEdit = !!initialValues?.id;

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
    const formData = new FormData();

    if (logo) {
      formData.append('consumable_image', logo);
    }

    formData.append('name', values.name);
    formData.append('category_id', values.category_id);
    try {
      if (isEdit) {
        let changedValues = getChangedFields(initialValues, values);
        if (!changedValues) {
          message.info('Нет изменений');
          onSuccess?.();
          return;
        }
        await patchItem({ id: initialValues.id, body: formData }).unwrap();
        message.success('Успешно обновлен');
      } else {
        await createItem(formData).unwrap();
        message.success('Успешно создано');
      }
      onSuccess?.();
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
        className={styles.form}
        requiredMark={false}
      >
        <div className={styles.uploadDragger}>
          <span className={styles.label}>Расходник</span>
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

        <div className={styles.row}>
          <Form.Item
            name='name'
            label='Название'
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input
              placeholder='Введите название расходника'
              variant='borderless'
            />
          </Form.Item>
          <Form.Item name='category_id' label='Категория'>
            <SelectWithSearch
              placeholder='Выберите категорию'
              options={mapToOptions(allCategories)}
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
