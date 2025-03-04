import { CommonModule } from '@angular/common';
import { Component, computed, input, linkedSignal, Signal } from '@angular/core';

import { BaseProperty } from '@hrms-server/model/property.z';
import { EmptyObject, entityUtils, KeyProperty } from 'ui-kit';
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
  };
  entity = input.required<EntityKeys>();

  entityInfo = linkedSignal(entityUtils.getEntitySignal<T>(this.entity));

  properties: Signal<KeyProperty<T>[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return entityUtils.getKeyProperties(entityInfo);
  });
  selectProp = linkedSignal<KeyProperty<T>[]>(() => this.properties());
  upRow(pkey: KeyProperty<any>) {
    let props = this.selectProp();
    const index: number = props.findIndex((item) => item.key == pkey.key);

    if (index != 0) {
      const template = props[index];
      props[index] = props[index - 1];
      props[index - 1] = template;
    } else {
      props.shift();
    }
  }
  downRow(pkey: KeyProperty<any>) {
    let props = this.selectProp();
    const index = props.findIndex((i: KeyProperty<any>) => i.key == pkey.key);
    if (index != this.selectProp().length - 1) {
      const template = props[index];
      props[index] = props[index + 1];
      props[index + 1] = template;
      this.selectProp.set(props);
    } else {
      props.pop();
    }
  }
}
