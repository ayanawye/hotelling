export interface IHotelFloor {
  id?: number;
  floor: number;
  hull_id: number;
  hull: {
    id?: number;
    name: number;
  };
}

export interface IHotelEnclosure {
  id?: number;
  name: string;
}

export type RoomsColor =
  | 'black'
  | 'white'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'aqua'
  | 'magenta'
  | 'gray'
  | 'orange'
  | 'purple'
  | 'brown';

export interface IRoomType {
  id: number;
  name: string;
  code: string;
  color: RoomsColor;
  description?: string;
}

export interface IRoomStatus {
  id?: number;
  name?: string;
  code?: string;
  color?: RoomsColor;
}

export interface IRoomStock {
  id: number;
  room: number;
  description: string;
  hull_id: number;
  floor_id: number;
  room_type_id: number;
  status_id: number | null;
  hull: IHotelEnclosure;
  floor: IHotelFloor;
  room_type: IRoomType;
  status: IRoomStatus | null;
}
