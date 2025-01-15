import { ZodObject, ZodTypeAny } from 'zod';
import { BaseValidateProperty, Property } from './property';

export interface Entity<T = any> {
  name: string;
  schema: ZodObject<ZodRawShape1<T>>;
  properties: {
    [K in keyof T]: BaseValidateProperty;
  };
}

export interface FormEntity {
  name: string;
  properties: Array<Property & { name: string }>;
}

type NoValidationProperty = Omit<Property, 'validation'>;
interface EntityWithoutValidation<T> {
  name: string;
  properties: {
    [K in keyof T]: Property;
  };
}

export type ZodRawShape1<T> = {
  [K in keyof T]: ZodTypeAny;
};

export function generateEntity<T>(config: {
  entity: EntityWithoutValidation<T>;
  schema: ZodObject<ZodRawShape1<T>>;
}): Entity<T> {
  const entity: Entity<T> = config.entity as unknown as Entity<T>;
  entity.schema = config.schema;
  Object.keys(config.schema.shape).forEach((key) => {
    entity.properties[key as keyof T] = {
      property: entity.properties[key as keyof T] as unknown as Property,
      validation: config.schema.shape[key as keyof T],
    };
  });
  return entity;
}
