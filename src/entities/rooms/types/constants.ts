import { type RoomsColor } from '@entities/rooms/types/index.ts';

export interface ColorConfig {
  label: string;
  color: string;
  backgroundColor: string;
}

export const ROOMS_COLOR_CONFIG: Record<RoomsColor, ColorConfig> = {
  black: {
    label: 'Черный',
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
  white: {
    label: 'Белый',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  red: {
    label: 'Красный',
    color: '#FFFFFF',
    backgroundColor: '#FF4D4F',
  },
  green: {
    label: 'Зеленый',
    color: '#FFFFFF',
    backgroundColor: '#52C41A',
  },
  blue: {
    label: 'Синий',
    color: '#FFFFFF',
    backgroundColor: '#1890FF',
  },
  yellow: {
    label: 'Желтый',
    color: '#000000',
    backgroundColor: '#FFD666',
  },
  aqua: {
    label: 'Аква',
    color: '#000000',
    backgroundColor: '#13C2C2',
  },
  magenta: {
    label: 'Пурпурный',
    color: '#FFFFFF',
    backgroundColor: '#EB2F96',
  },
  gray: {
    label: 'Серый',
    color: '#FFFFFF',
    backgroundColor: '#8C8C8C',
  },
  orange: {
    label: 'Оранжевый',
    color: '#FFFFFF',
    backgroundColor: '#FA8C16',
  },
  purple: {
    label: 'Фиолетовый',
    color: '#FFFFFF',
    backgroundColor: '#722ED1',
  },
  brown: {
    label: 'Коричневый',
    color: '#FFFFFF',
    backgroundColor: '#873800',
  },
};
