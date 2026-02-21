import type { IHotel } from '@entities/tariff/types';

export type PersonalRole =
  | 'owner'
  | 'hotelmanager'
  | 'receptionist'
  | 'cleaningmanager'
  | 'cleaning_worker'
  | 'laundry'
  | 'techmanager'
  | 'restaurant_manager'
  | 'filial_administrator'
  | 'waiter';

export interface IPersonal {
  id: number;
  username: string;
  phone_number: string;
  full_name: string;
  hotel: string;
  role: PersonalRole;
  created_at?: string;
}

export interface IPersonalHistory {
  id: number;
  personal_id: number;
  personal?: IPersonal;
  action: string;
  description?: string;
  date: string;
  hotel: IHotel;
  hotel_id: number;
  created_at?: string;
}
