import { Component, computed, input } from '@angular/core';
import { Entity } from '../../model/entity';
import { ColumnFilterComponent } from './column-filter/column-filter.component';

@Component({
  selector: 'lib-data-grid',
  imports: [ColumnFilterComponent],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css',
})
export class DataGridComponent<T> {
  entity = input.required<Entity<T>>();
  data = input.required<T[]>();

  displayedColumns = computed(() => this.prepareDisplayedColumns());

  private prepareDisplayedColumns() {
    return Object.keys(this.entity().properties)
      .filter(
        (key) => this.entity().properties[key as keyof T].property.hooks?.list?.hidden !== true,
      )
      .map((key) => {
        return {
          key: key as keyof T,
          property: this.entity().properties[key as keyof T],
        };
      });
  }
}
