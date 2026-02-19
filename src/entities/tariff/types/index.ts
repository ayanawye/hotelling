import type { RoomsColor } from '@entities/rooms';
import type { IOrganization } from '@entities/organizations';

export interface IRoomType {
  id: number;
  name: string;
  code: string;
  color: RoomsColor;
  description: string;
}

export interface IHotel {
  id: number;
  name: string;
  logo?: string | null;
  address: string;
  director?: number | null;
  director_username: string;
  director_full_name: string;
}

export interface ITariff {
  id?: number;
  name: string;
  price: string;
  manually: boolean;
  early_check_in?: string | null;
  late_departure?: string | null;
  room_type_id: number;
  hotel?: IHotel;
  room_type?: IRoomType;
}

export interface IOrganizationTariff {
  id?: number;
  name?: string;
  price?: string;
  manually?: boolean;
  early_check_in?: string | null;
  late_departure?: string | null;
  organization_id?: number;
  room_type_id?: number;

  hotel?: IHotel;

  organization?: IOrganization;

  room_type?: IRoomType;
}
