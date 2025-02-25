import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
import { BaseValidateProperty } from '@hrms-server/model/property.z';
import allEntities from '../../entities/indext';

interface KeyProperty {
  key: string;
  property: BaseValidateProperty;
}

@Component({
  selector: 'app-edit-entity-info',
  imports: [JsonPipe, CommonModule],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent {
  entity = input.required<string>();

  entityInfo = computed(
    () => allEntities[this.entity() as unknown as keyof typeof allEntities] ?? { tt: 'tt' },
  );

  properties: Signal<KeyProperty[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return Object.keys(entityInfo.properties).map((key) => {
      return {
        key: key as keyof typeof entityInfo.properties,
        property: entityInfo.properties[key as keyof typeof entityInfo.properties],
      };
    });
  });
}
