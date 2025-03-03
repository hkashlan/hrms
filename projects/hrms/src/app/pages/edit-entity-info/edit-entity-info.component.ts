import { CommonModule } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
<<<<<<< HEAD

=======
>>>>>>> 5a3f46b315d73011ccf29aefd518803b8801b084
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

  entityInfo = entityUtils.getEntitySignal<T>(this.entity);

  properties: Signal<KeyProperty<T>[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return entityUtils.getKeyProperties(entityInfo);
  });
}
