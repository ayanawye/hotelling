export type ChargeKind =
  | 'ROOM'
  | 'SERVICE'
  | 'LAUNDRY'
  | 'RESTAURANT'
  | 'ADJUSTMENT';

export type ChargeStatus = 'OPEN' | 'PAID' | 'VOID';

export type PaymentType = 'cash' | 'card' | 'transfer';

export type TransactionKind = 'DEPOSIT' | 'PAYMENT' | 'REFUND';

export type TransactionStatus = 'SUCCEEDED' | 'VOID' | 'FAILED';

export type IFolioGuest = Record<string, string> | null;

export interface IFinanceTax {
  id: number;
  reservation_id: number;
  kind: ChargeKind;
  code: string;
  description: string;
  hotel: string;
  name: string;
  percent: string;
  status: string;
}

export interface IFinanceCurrency {
  id: number;
  hotel: string;
  code: string;
  name: string;
  is_base: boolean;
  is_operational: boolean;
  is_allowed_for_payment: boolean;
  rate_to_base: string;
  is_rate_static: boolean;
  rounding: string;
  is_active: boolean;
  updated_at: string;
}

export interface IFinancePaymentType {
  id: number;
  hotel: string;
  type: PaymentType;
  code: string;
  operation: string;
}

export interface IPaymentAllocation {
  transaction_id: string;
  amount: string;
}

export interface IPayment {
  id: number;
  guest_id: string;
  reservation_id: string;
  payment_type_id: string;
  currency_code: string;
  kind: TransactionKind;
  status: TransactionStatus;
  amount: string;
  unallocated_amount: string;
  note: string;
  occurred_at: string;
  allocations: IPaymentAllocation[];
}

export interface ITransactionCheckMini {
  id: number;
  reservation_id: string;
  kind: ChargeKind;
  status: ChargeStatus;
  title: string;
  amount: string;
  currency_code: string;
  occurred_at: string;
}

export interface ITransactionCheck {
  guest: IFolioGuest;
  transactions: ITransactionCheckMini[];
  subtotal: string;
  tax_total: string;
  final_total: string;
  paid_total: string;
  amount_due: string;
  tax_breakdown: string[] | null;
  kind: string;
}

export interface IFolioTransaction {
  id: number;
  reservation_id: number;
  kind: ChargeKind;
  status: ChargeStatus;
  service_id: number;
  title: string;
  description: string;
  quantity: string;
  unit_amount: string;
  amount: string;
  currency_code: string;
  occurred_at: string;
  created_at: string;
}
