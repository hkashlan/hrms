import { JsonPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import allEntities from '../../entities/indext';

@Component({
  selector: 'app-edit-entity-info',
  imports: [JsonPipe],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T> {
  entity = input.required<string>();

  user = computed(
    () => allEntities[this.entity() as unknown as keyof typeof allEntities] ?? { tt: 'tt' },
  );
}
