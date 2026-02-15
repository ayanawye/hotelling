export type IGuestShort = {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  email?: string;
  phone?: string;
};

export type IOrganizationShort = {
  id: number;
  name: string;
};

export type IGuaranteeType = string;

export type IReservationStatus =
  | 'reserved'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show';

export type IReservation = {
  id: number;
  hotel: number;
  guest: (IGuestShort & { email?: string; phone?: string }) | null;
  organization?: IOrganizationShort | null;
  room?: number | null;
  rooms?: number[];
  guarantee_type: IGuaranteeType;
  arrival_datetime?: string | null;
  departure_datetime?: string | null;
  nights?: number | null;
  adults?: number | null;
  children?: number | null;
  infants?: number | null;
  status: IReservationStatus;
  group_id: string;
};
