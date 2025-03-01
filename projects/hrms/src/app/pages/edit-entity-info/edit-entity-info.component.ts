import { Component, computed, input, Signal } from '@angular/core';
import { EmptyObject, entityUtils, KeyProperty } from 'ui-kit';
import { EntityKeys } from '../../entities/indext';

@Component({
  selector: 'app-edit-entity-info',
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T extends EmptyObject = EmptyObject> {
  entity = input.required<EntityKeys>();

  entityInfo = entityUtils.getEntitySignal<T>(this.entity);

  properties: Signal<KeyProperty<T>[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return entityUtils.getKeyProperties(entityInfo);
  });
}
