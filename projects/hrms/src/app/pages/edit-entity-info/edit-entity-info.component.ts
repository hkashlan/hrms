import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, Signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionButton,
  DataGridComponent,
  EmptyObject,
  Entity,
  entityUtils,
  HeroIcons,
} from 'ui-kit';
import { EntityKeys } from '../../entities/indext';
import { propertyType, propertyWithValidationInfo } from './entity-info';

@Component({
  selector: 'app-edit-entity-info',
  imports: [CommonModule, DataGridComponent],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T extends EmptyObject = EmptyObject> {
  entity = input.required<EntityKeys>();

  entityInfo = linkedSignal(entityUtils.getEntitySignal<T>(this.entity));

  propertyWithValidationInfo = propertyWithValidationInfo;

  properties: Signal<propertyType[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return entityUtils.getKeyProperties(entityInfo) as propertyType[];
  });

  actions: ActionButton<any>[] = [
    {
      icon: HeroIcons.arrowDown,
      action: (row, index) => this.downRow(index),
    },
    {
      icon: HeroIcons.arrowUp,
      action: (row, index) => this.upRow(index),
    },
    {
      icon: HeroIcons.pencil,
      action: (row) =>
        inject(Router).navigate(['../detail', row.id], { relativeTo: inject(ActivatedRoute) }),
    },
  ];

  selectProp = linkedSignal<propertyType[]>(() => this.properties());
  upRow(index: number) {
    const properties = this.properties();
    const [property] = properties.splice(index, 1);
    properties.splice(index - 1, 0, property);
    this.updateEntityInfos(properties);
  }

  downRow(index: number) {
    this.upRow(index + 1);
  }

  private updateEntityInfos(properties: propertyType[]) {
    const entityInfos = this.entityInfo();
    entityInfos.properties = properties.reduce(
      (acc, prop) => ({ ...acc, [prop.key]: prop }),
      {} as Entity<T>['properties'],
    );
    this.entityInfo.set(entityInfos);
  }
}
