import { computed, Signal } from '@angular/core';
import { Entity } from 'ui-kit';
import { entityInfos, EntityKeys } from '../entities/indext';

export const entityUtils = {
  getEntity: <T = any>(name: EntityKeys): Entity<T> => {
    return entityInfos[name];
  },
  getEntitySignal: <T = any>(name: Signal<EntityKeys>): Signal<Entity<T>> => {
    return computed(() => entityUtils.getEntity(name()));
  },
};
