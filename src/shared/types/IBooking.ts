export type IGuestShort = {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  language?: string;
  title?: string;
  email?: string;
  citizenship?: string;
  vip_code?: string | null;
  guest_category?: string | null;
  phone?: string;
  comment?: string;
};

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

export type IReservation = {
  id: number;
  hotel: number;
  guest: IGuestShort | null;
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
};
