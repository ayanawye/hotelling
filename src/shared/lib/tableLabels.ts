import type {
  IReservationStatus,
  IGuaranteeType,
} from '@shared/types/IBooking.ts';

export const GUARANTEE_TYPE_LABELS: Record<IGuaranteeType, string> = {
  none: 'Без гарантии',
  company: 'Гарантия компании',
  prepaid: 'Предоплата',
  card: 'Гарантия картой',
};
import type { GuestLanguage, GuestTitle } from '@entities/guests/types';
import type { RoomsColor } from '@entities/rooms';

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

export const GUESTS_TITLE: Record<GuestTitle, string> = {
  mr: 'Г-н',
  mrs: 'Г-жа',
  miss: 'Мисс',
  sir: 'Сэр',
  madam: 'Мадам',
  professor: 'Профессор',
  doctor: 'Доктор',
};

export const GUESTS_LANGUAGE: Record<GuestLanguage, string> = {
  ru: 'Русский',
  en: 'Английский',
  de: 'Немецкий',
};

export const colorMap: Record<RoomsColor, { name: string; hex: string }> = {
  white: { name: 'Белый', hex: '#FFFFFF' },
  black: { name: 'Черный', hex: '#000000' },
  red: { name: 'Красный', hex: '#FF4D4F' },
  green: { name: 'Зеленый', hex: '#52C41A' },
  blue: { name: 'Синий', hex: '#1890FF' },
  yellow: { name: 'Желтый', hex: '#FADB14' },
  aqua: { name: 'Аква', hex: '#13C2C2' },
  magenta: { name: 'Маджента', hex: '#EB2F96' },
  gray: { name: 'Серый', hex: '#8C8C8C' },
  orange: { name: 'Оранжевый', hex: '#FA8C16' },
  purple: { name: 'Фиолетовый', hex: '#722ED1' },
  brown: { name: 'Коричневый', hex: '#873800' },
};
