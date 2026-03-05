import type { IGuest } from '@entities/guests/types';

export type IOrganizationShort = {
  id: number;
  name: string;
};

export type IGuaranteeType = 'none' | 'company' | 'prepaid' | 'card';

export type IReservationStatus =
  | 'reserved'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show';

export interface IFolioTransaction {
  id: number;
  reservation_id: number;
  kind: string;
  status: string;
  service_id: number;
  title: string;
  description: string;
  quantity: number;
  unit_amount: number;
  amount: number;
  currency_code: string;
  occurred_at: string;
  created_at: string;
}

export interface IReservation {
  id: number;
  hotel: number;
  guest: IGuest | null;
  organization?: IOrganizationShort | null;
  room?: number | null;
  rooms?: number[];
  guarantee_type: IGuaranteeType;
  arrival_datetime: string;
  departure_datetime: string;
  nights: number;
  adults: number;
  children?: number | null;
  infants?: number | null;
  status: IReservationStatus;
  group_id: string;
  folio_transactions: IFolioTransaction[];
}
