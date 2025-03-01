import { computed, Signal } from '@angular/core';
import { BaseValidateProperty } from '@hrms-server/model/property.z';
import { Entity } from 'ui-kit';
import { entityInfos, EntityKeys } from '../../../../hrms/src/app/entities/indext';

export type EmptyObject = {};

export interface KeyProperty<T extends {}> {
  key: keyof T;
  property: BaseValidateProperty;
}

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
        property: entity.properties[key as keyof typeof entity.properties],
      };
    });
  },
};
