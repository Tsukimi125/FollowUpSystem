import type { ReactNode } from 'react';

export interface FormItemType {
  label?: string;
  name: string;
  componentType: 'string' | 'number';
  component?: ReactNode;
  unit?: string;
  remarks?: string;
}
