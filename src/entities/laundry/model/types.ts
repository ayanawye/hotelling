import type { PersonalRole } from '@entities/staff';

export interface IWashingItem {
  id: number;
  name: string;
  image?: string;
  category?: string;
}

export interface IWashingCreateItem {
  item_id: number;
  quantity: number | null;
  name?: string;
  id?: number;
  unit_amount?: number | null;
}

export interface ICreateWashingRequest {
  laundry_personal_id: number;
  items: IWashingCreateItem[];
  comment?: string;
}

export interface IUser {
  id: number;
  username: string;
  full_name?: string;
}

export type Status = 'new' | 'in_progress' | 'finished' | 'canceled';

export interface IWashing {
  id: number;
  status: Status;
  status_label: string;
  created_at: string;
  started_at?: string | null;
  finished_at?: string | null;
  duration_seconds: string;
  comment: string;
  created_by: IUser;
  laundry_personal: IUser;
  items: {
    item: IWashingItem;
    quantity: number;
  }[];
  consumables: string;
}

export interface ICleaningWorker {
  id: number;
  username: string;
  full_name?: string;
  role: PersonalRole;
  role_display: string;
  hotel: string;
  is_busy: boolean;
  active_tasks: string;
}

export interface ILaundryItemCategory {
  id: number;
  name: string;
  parent?: number | null;
  parent_id?: number | null;
}

export interface ILaundryItem {
  id: number;
  name: string;
  is_active: boolean;
  item_type: 'laundry' | 'order';
  category: ILaundryItemCategory;
  category_id: number;
  item_image?: string;
  item_image_url: string;
}

export interface ILaundryOrder {
  id?: number;
  status: Status;
  status_label: string;
  created_at: string;
  started_at?: string | null;
  finished_at?: string | null;
  duration_seconds: string;
  planned_pickup_time?: string | null;
  comment: string;
  created_by: IUser;
  laundry_personal: IUser;
  laundry_personal_id: number;
  guest: {
    id: number;
    name: string;
  };
  reservation: string;
  items: IWashingCreateItem[];
  total_amount: string;
  folio_transaction: string;
  consumables: string;
}
