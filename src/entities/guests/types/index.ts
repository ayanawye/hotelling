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
}
