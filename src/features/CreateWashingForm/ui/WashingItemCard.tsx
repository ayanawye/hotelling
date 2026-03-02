import React from 'react';
import { theme } from 'antd';
import type { ILaundryItem } from '@entities/laundry';
import s from './WashingItemCard.module.scss';
import { MinusIcon, PlusIconNoBorderIcon } from '@shared/assets';

interface WashingItemCardProps {
  item: ILaundryItem;
  quantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export const WashingItemCard: React.FC<WashingItemCardProps> = ({
  item,
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const { token } = theme.useToken();

  const dynamicVars = {
    '--border-radius': `${token.borderRadiusLG}px`,
    '--bg-color': token.colorBgContainer,
    '--primary-color': token.colorPrimary,
  } as React.CSSProperties;

  return (
    <div
      className={`${s.card} ${quantity > 0 ? s.active : ''}`}
      style={dynamicVars}
    >
      <div className={s.imageWrapper}>
        {item.item_image ? (
          <img src={item.item_image} alt={item.name} className={s.image} />
        ) : (
          <div className={s.placeholder} />
        )}
        <span className={s.name}>{item.name}</span>
      </div>
      <div className={s.controls}>
        <button
          type='button'
          className={s.btn}
          onClick={() => onDecrease(item.id)}
          disabled={quantity === 0}
        >
          <MinusIcon />
        </button>
        <span className={s.quantity}>{quantity} шт</span>
        <button
          type='button'
          className={s.btn}
          onClick={() => onIncrease(item.id)}
        >
          <PlusIconNoBorderIcon />
        </button>
      </div>
    </div>
  );
};
