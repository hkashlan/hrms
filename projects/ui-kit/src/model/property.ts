import { ZodType } from 'zod';

export type PropertyInputType = 'number' | 'text';

export type PropertyType = 'primary' | 'textarea' | 'autocomplete' | 'date' | 'select' | 'boolean';

export interface BaseProperty {
  type: PropertyType | PropertyInputType;
  label: string;
  // validation: ZodType;
}

export interface BaseBaseProperty {
  type: 'primary' | 'textarea' | 'date' | PropertyInputType;
  label: string;
  // validation: ZodType;
}

export interface BaseValidateProperty {
  property: Property;
  validation: ZodType;
}

export interface InputProperty extends BaseProperty {
  type: 'number' | 'text';
}

export interface AutoCompleteProperty extends BaseProperty {
  type: 'autocomplete';
  options: string[];
}

export interface SelectProperty extends BaseProperty {
  type: 'select';
  options: string[];
}

export interface BooleanProperty extends BaseProperty {
  type: 'boolean';
}

export type Property = AutoCompleteProperty | SelectProperty | BooleanProperty | BaseBaseProperty;
