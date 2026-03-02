import React, { useMemo, useState } from 'react';
import { Empty, Form, Input, message } from 'antd';
import { BottomArrowIcon, DeleteRedIcon, SearchIcon } from '@shared/assets';
import { Button, SelectWithSearch } from '@shared/ui';
import {
  useCreateWashingMutation,
  useGetLaundryItemCategoriesQuery,
  useGetLaundryItemsQuery,
} from '@entities/laundry';
import { WashingItemCard } from './WashingItemCard';
import s from './CreateWashingForm.module.scss';
import { mapToOptions } from '@shared/lib';
import { useNavigate } from 'react-router-dom';
import { useGetStaffsQuery } from '@entities/staff';

export const CreateWashingForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [itemsQuantity, setItemsQuantity] = useState<Record<number, number>>(
    {},
  );

  const { data: washingItems = [], isLoading: isItemsLoading } =
    useGetLaundryItemsQuery('laundry');
  const { data: staff = [], isLoading: isStaffLoading } =
    useGetStaffsQuery('laundry');
  const { data: washingItemCategories } = useGetLaundryItemCategoriesQuery();
  const [createWashing, { isLoading: isCreating }] = useCreateWashingMutation();

  const handleIncrease = (id: number) => {
    setItemsQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id: number) => {
    setItemsQuantity((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  const handleRemove = (id: number) => {
    setItemsQuantity((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectedItemsList = useMemo(() => {
    return Object.entries(itemsQuantity)
      .filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const item = washingItems.find((i) => i.id === Number(id));
        return { item, quantity: q };
      })
      .filter((i) => i.item);
  }, [itemsQuantity, washingItems]);

  const onFinish = async (values: { laundry_personal_id: number }) => {
    const items = Object.entries(itemsQuantity)
      .filter(([_, q]) => q > 0)
      .map(([id, q]) => ({
        item_id: Number(id),
        quantity: q,
      }));

    if (items.length === 0) {
      message.warning('Выберите хотя бы один предмет');
      return;
    }

    try {
      await createWashing({
        laundry_personal_id: values.laundry_personal_id,
        items,
      }).unwrap();
      message.success('Стирка успешно создана');
      setItemsQuantity({});
      form.resetFields();
      navigate('/laundry/washings');
    } catch (e) {
      message.error('Ошибка при создании стирки');
    }
  };

  return (
    <Form
      form={form}
      className={s.form}
      layout='vertical'
      onFinish={onFinish}
      requiredMark={false}
    >
      <div className={s.header}>
        <h2 className={s.title}>Новая стирка</h2>
        <Button variant='primary' htmlType='submit' isLoading={isCreating}>
          Создать
        </Button>
      </div>

      <div className={s.content}>
        <div className={s.mainSection}>
          <div className={s.filters}>
            <Input
              prefix={<SearchIcon />}
              placeholder='Введите название предмета'
              className={s.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SelectWithSearch
              placeholder='Категория'
              className={s.categorySelect}
              suffixIcon={<BottomArrowIcon />}
              options={mapToOptions(washingItemCategories, 'category')}
              value={selectedCategory}
              onChange={setSelectedCategory}
              allowClear
            />
          </div>

          <div className={s.grid}>
            {washingItems.map((item) => (
              <WashingItemCard
                key={item.id}
                item={item}
                quantity={itemsQuantity[item.id] || 0}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
            {washingItems.length === 0 && !isItemsLoading && (
              <div className={s.empty}>
                <Empty description='Предметы не найдены' />
              </div>
            )}
          </div>
        </div>

        <aside className={s.sidebar}>
          <div className={s.sidebarBlock}>
            <h3 className={s.sidebarLabel}>Клининг персонал:</h3>
            <Form.Item
              name='laundry_personal_id'
              rules={[{ required: true, message: 'Выберите персонал' }]}
              className={s.formItem}
            >
              <SelectWithSearch
                prefix={<SearchIcon />}
                placeholder='Поиск персонала'
                options={mapToOptions(staff)}
                loading={isStaffLoading}
                className={s.staffSelect}
              />
            </Form.Item>
          </div>

          <div className={s.sidebarBlock}>
            <h3 className={s.sidebarLabel}>Предмет:</h3>
            <div className={s.selectedList}>
              {selectedItemsList.length > 0 ? (
                selectedItemsList.map(({ item, quantity }) => (
                  <div key={item?.id} className={s.selectedItem}>
                    <div className={s.selectedInfo}>
                      <span className={s.selectedName}>{item?.name}:</span>
                      <span className={s.selectedQty}>{quantity} шт</span>
                    </div>
                    <button
                      type='button'
                      className={s.removeBtn}
                      onClick={() => item && handleRemove(item.id)}
                    >
                      <DeleteRedIcon />
                    </button>
                  </div>
                ))
              ) : (
                <div className={s.noItems}>
                  <span className={s.warningIcon}>!</span>
                  Выберите предмет
                </div>
              )}
            </div>
          </div>
          <div className={s.sidebarBlock}>
            <Form.Item name='description' label='Комментарий к стирке'>
              <Input.TextArea
                rows={4}
                placeholder='Напишите...'
                variant='borderless'
              />
            </Form.Item>
          </div>
        </aside>
      </div>
    </Form>
  );
};
