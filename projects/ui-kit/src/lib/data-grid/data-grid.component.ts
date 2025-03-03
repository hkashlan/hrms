import {
  Component,
  computed,
  EnvironmentInjector,
  inject,
  input,
  runInInjectionContext,
} from '@angular/core';
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

<<<<<<< HEAD
  environmentInjector = inject(EnvironmentInjector);

  doAction(row: T, action: ActionButton<T>) {
    runInInjectionContext(this.environmentInjector, () => action.action(row));
  }

=======
>>>>>>> 5a3f46b315d73011ccf29aefd518803b8801b084
  private prepareDisplayedColumns(): KeyProperty<T>[] {
    return entityUtils
      .getKeyProperties(this.entity())
      .filter((keyProperty) => keyProperty.property.hooks?.list?.hidden !== true);
  }
}
