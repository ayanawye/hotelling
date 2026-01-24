export interface IGuestShort {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
}

export interface IOrganizationShort {
  id: number;
  name: string;
}

export type IGuaranteeType = 'type1' | 'type2' | 'type3' | 'type4';

export type IReservationStatus =
  | 'status1'
  | 'status2'
  | 'status3'
  | 'status4'
  | 'status5';

export interface IReservation {
  id: number;
  hotel: number;
  guest: IGuestShort;
  organization?: IOrganizationShort | null;
  room?: number | null;
  guarantee_type: IGuaranteeType;
  arrival_datetime?: string | null;
  departure_datetime?: string | null;
  nights?: number | null;
  adults?: number | null;
  children?: number | null;
  infants?: number | null;
  status: IReservationStatus;
  group_id: string; // uuid
}
