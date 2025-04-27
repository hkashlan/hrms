import { computed, Signal } from '@angular/core';
import { Property } from '@hrms-server/model/property.z';
import { Entity } from 'ui-kit';
import { entityInfos, EntityKeys } from '../../../../hrms/src/app/entities/indext';

export type EmptyObject = {};

export type KeyProperty<T extends {}> = Property & {
  key: keyof T;
};

export const entityUtils = {
  getEntity: <T = any>(name: EntityKeys): Entity<T> => {
    return entityInfos[name];
  },

  getEntitySignal: <T = any>(name: Signal<EntityKeys>): Signal<Entity<T>> => {
    return computed(() => entityUtils.getEntity(name()));
  },

  getKeyProperties: <T extends EmptyObject = EmptyObject>(entity: Entity<T>): KeyProperty<T>[] => {
    return Object.keys(entity.properties).map((key) => {
      return {
        key: key as keyof T,
        ...(entity.properties[key as keyof typeof entity.properties] as Property),
      };
    });
  },
};
