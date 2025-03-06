import { CommonModule } from '@angular/common';
import { Component, computed, input, linkedSignal, Signal } from '@angular/core';

import { BaseProperty } from '@hrms-server/model/property.z';
import { EmptyObject, Entity, entityUtils, KeyProperty } from 'ui-kit';
import { EntityKeys } from '../../entities/indext';
import { EditEntityPropertyComponent } from './edit-entity-property/edit-entity-property.component';

@Component({
  selector: 'app-edit-entity-info',
  imports: [CommonModule, EditEntityPropertyComponent],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T extends EmptyObject = EmptyObject> {
  type2Color: Record<BaseProperty['type'], string> = {
    primary: 'btn-primary',
    number: 'btn-secondary',
    select: 'btn-info',
    boolean: 'btn-secondary',
    text: 'btn-warning',
    textarea: 'btn-warning',
    date: 'btn-success',
    autocomplete: 'btn-success',
    json: 'btn-danger',
  };
  entity = input.required<EntityKeys>();

  entityInfo = linkedSignal(entityUtils.getEntitySignal<T>(this.entity));

  properties: Signal<KeyProperty<T>[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return entityUtils.getKeyProperties(entityInfo);
  });

  selectProp = linkedSignal<KeyProperty<T>[]>(() => this.properties());
  upRow(index: number) {
    const properties = this.properties();
    const [property] = properties.splice(index, 1);
    properties.splice(index - 1, 0, property);
    this.updateEntityInfos(properties);
  }

  downRow(index: number) {
    this.upRow(index + 1);
  }

  private updateEntityInfos(properties: KeyProperty<T>[]) {
    const entityInfos = this.entityInfo();
    entityInfos.properties = properties.reduce(
      (acc, prop) => ({ ...acc, [prop.key]: prop.property }),
      {} as Entity<T>['properties'],
    );
    this.entityInfo.set(entityInfos);
  }
}
