import { Component, effect, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Entity } from '../../model/entity';
import { HeroIcons } from '../../model/icons';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { entityUrlResource } from '../utils/entity-resource';
import { curdActions } from '../utils/generic-grid-actions';

@Component({
  selector: 'lib-list-page',
  imports: [DataGridComponent, RouterModule],
  template: `
    <div class="flex justify-between items-center mb-4 bg-primary text-white p-4">
      <h1 class="text-2xl font-bold">{{ entity().label }} management</h1>
      <button class="btn btn-circle" [routerLink]="'../detail'">
        <img [src]="icons.plusCircle" class="size-full" />
      </button>
    </div>
    <lib-data-grid [entity]="entity()" [data]="data.value() ?? []" [actions]="actions" />
  `,
})
export class ListPageComponent<T> {
  icons = HeroIcons;
  entity = input.required<Entity<T>>();
  fn = input.required<(x: any) => Promise<T[]>>();

  data = entityUrlResource(this.fn);

  actions = curdActions;

  constructor() {
    effect(() => {
      console.log(this.fn());
    });
  }
}
