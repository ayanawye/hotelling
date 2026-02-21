import type { IHotel } from '@entities/tariff/types';
import type { IRoomStock } from '@entities/rooms';

export interface IConsumableCategory {
  id: number;
  name: string;
  category: IConsumableCategory;
  sub_category_id?: number;
  sub_category?: IConsumableCategory;
  hotel?: IHotel;
}

export interface IConsumable {
  id: number;
  name: string;
  category: IConsumableCategory;
  category_id: number;
  hotel: IHotel;
  image?: string;
}

export interface IConsumableUsage {
  id: number;
  quantity: number;
  date?: string;
  note?: string | null;
  consumable_id: number;
  room_id: number;
  hotel: IHotel;
  user: string;
  consumable: IConsumable;
  room: IRoomStock;
}
