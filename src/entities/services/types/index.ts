export interface IServiceCategory {
  id: number;
  hotel: number;
  name: string;
  parent?: number | null;
  is_active: boolean;
  sort_order: number;
}

export interface IService {
  id: number;
  hotel: number;
  category?: number | null;
  category_name: string;
  name: string;
  description?: string;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IServiceOrder {
  id?: number;
  guest_id?: number;
  guest_name?: string;
  reservation_id?: number;
  service_id?: number;
  service_name?: string;
  quantity?: string | number | null;
  unit_amount?: string;
  amount?: string;
  description?: string;
  status?: 'OPEN' | 'PAID' | 'VOID';
  occurred_at?: string;
  created_at?: string;
  shift?: string;
  created_by_id?: number;
  created_by_username?: string;
  created_by_full_name?: string;
}
