import { type RoomsColor } from '@entities/rooms/types';

export interface IOrganizationType {
  id: number;
  name: string;
}

export type ClientType = 'legal' | 'physical';

export interface IOrganization {
  id: number;
  name: string;
  client_type: ClientType;
  organization_type_id: number;
  organization_type: IOrganizationType;
  armor_color: RoomsColor;
  payment_type_id: number;
  payment_type_name: string;
  manager_username: string;
  manager_full_name: string;
  address: string;
  inn: string;
  okpo: string;
  ugns: string;
  bank: string;
  settlement: string;
  bik: string;
  swift: string;
  gmail: string;
  website: string;
  first_phone: string;
  second_phone: string;
  third_phone: string;
}
