import type { IReservation } from '@shared/types/IBooking.ts';

export type GuestLanguage = 'en' | 'ru' | 'de';

export type GuestTitle =
  | 'mr'
  | 'mrs'
  | 'miss'
  | 'sir'
  | 'madam'
  | 'professor'
  | 'doctor';

export type VipCode = 'middle_manager' | 'top_manager' | 'special_guest';

export type GuestCategory = 'undesirable' | 'non_payer' | 'regular';

export type IGuestStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export interface IGuest {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  language: GuestLanguage;
  title: GuestTitle;
  email: string;
  citizenship: string;
  vip_code?: VipCode | null;
  guest_category?: GuestCategory | null;
  phone: string;
  comment: string;
  status: IGuestStatus;
  reservations: IReservation[];
}

export interface IPassport {
  series: string;
  number: string;
  issued_by: string;
  personal_number: string;
  sex: 'M' | 'F';
  issue_date?: string | null;
  expiry_date?: string | null;
  birth_date?: string | null;
  birth_place: string;
  nationality: string;
  document_type: string;
  mrz_raw: string;
  photo_front?: string | null;
  photo_back?: string | null;
}
