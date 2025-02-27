import { JsonPipe } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
import { BaseValidateProperty } from '@hrms-server/model/property.z';
import { EntityKeys } from '../../entities/indext';
import { entityUtils } from '../../utils/entity.utils';

interface KeyProperty {
  key: string;
  property: BaseValidateProperty;
}

@Component({
  selector: 'app-edit-entity-info',
  imports: [JsonPipe],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T> {
  entity = input.required<EntityKeys>();

  entityInfo = entityUtils.getEntitySignal<T>(this.entity);

  properties: Signal<KeyProperty[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return Object.keys(entityInfo.properties).map((key) => {
      return {
        key: key as keyof typeof entityInfo.properties,
        property: entityInfo.properties[key as keyof typeof entityInfo.properties],
      } as KeyProperty;
    });
  });
}
