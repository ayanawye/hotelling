import type { IReservationStatus } from '@shared/types/IBooking.ts';
import type { GuestLanguage, GuestTitle } from '@entities/guests/types';

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
  mr: 'Мистер',
  mrs: 'Миссис',
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
