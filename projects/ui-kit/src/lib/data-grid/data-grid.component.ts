import { Component, computed, input } from '@angular/core';
import { EmptyObject, entityUtils, KeyProperty } from 'ui-kit';
import { Entity } from '../../model/entity';
import { ColumnFilterComponent } from './column-filter/column-filter.component';

@Component({
  selector: 'lib-data-grid',
  imports: [ColumnFilterComponent],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css',
})
export class DataGridComponent<T extends EmptyObject = EmptyObject> {
  entity = input.required<Entity<T>>();
  data = input.required<T[]>();

  displayedColumns = computed(() => this.prepareDisplayedColumns());

  private prepareDisplayedColumns(): KeyProperty<T>[] {
    return entityUtils
      .getKeyProperties(this.entity())
      .filter((keyProperty) => keyProperty.property.hooks?.list?.hidden !== true);
  }
}
