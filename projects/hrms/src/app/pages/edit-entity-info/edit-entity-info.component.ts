import { JsonPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import allEntities from '../../entities/indext';

@Component({
  selector: 'app-edit-entity-info',
  imports: [JsonPipe],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent {
  entity = input.required<string>();

  entityInfo = computed(
    () => allEntities[this.entity() as unknown as keyof typeof allEntities] ?? { tt: 'tt' },
  );

  properties = computed(() => {
    const entityInfo = this.entityInfo();
    return Object.keys(entityInfo).map((key) => {
      return {
        key: key as keyof typeof entityInfo,
        property: entityInfo[key as keyof typeof entityInfo],
      };
    });
  });
}
