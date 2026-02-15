export interface Hull {
  id: number;
  name: string;
}

export interface Floor {
  id: number;
  floor: number;
  hull_id: number;
  hull: Hull;
}

export interface RoomType {
  id: number;
  name: string;
  code: string;
  color: string;
  description: string;
}

export interface RoomStatus {
  id: number;
  code: string;
  name: string;
  color: string;
}

export interface Room {
  id: number;
  room: number;
  description: string;
  hull_id: number;
  floor_id: number;
  room_type_id: number;
  status_id: number;
  hull: Hull;
  floor: Floor;
  room_type: RoomType;
  status: RoomStatus;
}
