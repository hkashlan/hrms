import { EntityInfo } from '@hrms-server/model/entity.z';
import { Property } from '@hrms-server/model/property.z';
import { ZodObject, ZodTypeAny } from 'zod';

export interface Entity<T = any> {
  name: string;
  label: string;
  schema?: ZodObject<ZodRawShape1<T>>;
  properties: {
    [K in keyof T]: Property;
  };
  formChanged?: (entity: Entity<T>, value: T | null | undefined) => void;
}

export interface FormEntity {
  name: string;
  properties: Array<Property & { name: string }>;
}

export type ZodRawShape1<T> = {
  [K in keyof T]: ZodTypeAny;
};

// type EnforceValidProperties<T> = Omit<EntityInfo<T>, 'properties'> & {
//   properties: {
//     [K in keyof T]: Property<T>;
//   };
//   // & {
//   //   [K: string]: never;
//   // };
// };

export function generateEntity<T>(config: {
  entity: EntityInfo<T>;
  schema: ZodObject<ZodRawShape1<T>>;
  formChanged?: (entityInfo: Entity<T>, value: T | null | undefined) => void;
}): Entity<T> {
  const entity: Entity<T> = config.entity as unknown as Entity<T>;
  entity.schema = config.schema;
  Object.keys(config.schema.shape).forEach((key) => {
    entity.properties[key as keyof T] = {
      ...entity.properties[key as keyof T],
      validation: config.schema.shape[key as keyof T],
    } as Property<T>;
  });
  if (config.formChanged) {
    entity.formChanged = (e, value) => config.formChanged!(e, value);
  }
  return entity;
}
