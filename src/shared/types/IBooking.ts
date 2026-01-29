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

export type IGuaranteeType = 'none' | 'company' | 'prepaid' | 'card';

export type IReservationStatus =
  | 'reserved'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show';

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
  group_id: string;
}

export const RESERVATION_STATUS_CONFIG: Record<
  IReservationStatus,
  {
    label: string;
    textColor: string;
    bgColor: string;
    borderColor?: string;
  }
> = {
  reserved: {
    label: 'Забронировано',
    textColor: '#1D39C4',
    bgColor: '#F0F5FF',
  },
  checked_in: {
    label: 'Заселён',
    textColor: '#237804',
    bgColor: '#F6FFED',
  },
  checked_out: {
    label: 'Выселен',
    textColor: '#595959',
    bgColor: '#FAFAFA',
  },
  cancelled: {
    label: 'Отменено',
    textColor: '#A8071A',
    bgColor: '#FFF1F0',
  },
  no_show: {
    label: 'Не заехал',
    textColor: '#AD6800',
    bgColor: '#FFF7E6',
  },
};
