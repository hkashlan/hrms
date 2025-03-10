import { Entity } from '../../../model/entity';

export interface DetailPageConfig<T> {
  entity: Entity<T>;
  update: (record: T) => Promise<T>;
  create: (record: Omit<T, 'id'>) => Promise<T>;
  getById: (record: number) => Promise<T>;
}
