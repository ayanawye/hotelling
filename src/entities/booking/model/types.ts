export interface Room {
  id: string;
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
}
