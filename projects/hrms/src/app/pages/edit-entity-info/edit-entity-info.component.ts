import { CommonModule } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
import { BaseProperty, BaseValidateProperty } from '@hrms-server/model/property.z';
import allEntities from '../../entities/indext';
import { EditEntityPropertyComponent } from './edit-entity-property/edit-entity-property.component';

export interface KeyProperty {
  key: string;
  property: BaseValidateProperty;
}

@Component({
  selector: 'app-edit-entity-info',
  imports: [CommonModule, EditEntityPropertyComponent],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent {
  type2Color: Record<BaseProperty['type'], string> = {
    primary: 'btn-primary',
    number: 'btn-secondary',
    select: 'btn-info',
    boolean: 'btn-secondary',
    text: 'btn-warning',
    textarea: 'btn-warning',
    date: 'btn-success',
    autocomplete: 'btn-success',
  };
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
