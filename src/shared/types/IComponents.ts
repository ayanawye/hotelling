import type { ReactNode } from 'react';

export interface SelectOption {
  label: string | ReactNode;
  value: string | number;
}
