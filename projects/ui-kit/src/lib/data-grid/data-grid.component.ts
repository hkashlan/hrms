import { Component, computed, inject, Injector, input, runInInjectionContext } from '@angular/core';
import { ButtonDirective } from 'daisyui';
import { EmptyObject, entityUtils, KeyProperty } from 'ui-kit';
import { Entity } from '../../model/entity';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { ActionButton } from './data-grid';

@Component({
  selector: 'lib-data-grid',
  imports: [ColumnFilterComponent, ButtonDirective],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css',
})
export class DataGridComponent<T extends EmptyObject = EmptyObject> {
  entity = input.required<Entity<T>>();
  data = input.required<T[]>();
  actions = input<ActionButton<T>[]>();

  displayedColumns = computed(() => this.prepareDisplayedColumns());

  injector: Injector = inject(Injector);

  doAction(row: T, index: number, action: ActionButton<T>) {
    runInInjectionContext(this.injector, () => action.action(row, index));
  }

  private prepareDisplayedColumns(): KeyProperty<T>[] {
    const retVal = entityUtils
      .getKeyProperties(this.entity())
      .filter((keyProperty) => keyProperty.hooks?.list?.hidden !== true);
    return retVal;
  }
}
