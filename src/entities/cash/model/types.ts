export type ICashShiftStatus = 'OPEN' | 'CLOSED' | 'PENDING_CLOSE';

export interface ICashCurrency {
  id: number;
  code: string;
  name: string;
}

export interface ICash {
  id?: number;
  hotel?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  allowed_currencies: ICashCurrency[];
}

export interface ICashBalance {
  id?: number;
  hotel?: string;
  cashbox: number;
  cashbox_name: string;
  currency: number;
  currency_code: string;
  amount: string;
  updated_at: string;
}

export interface ICashShift {
  id?: number;
  hotel?: string;
  cashbox: number;
  cashbox_name?: string;
  shift: string;
  status?: ICashShiftStatus;
  opened_at?: string;
  closed_at?: string;
  opened_by?: string;
  closed_by: string;
  note?: string;
}
