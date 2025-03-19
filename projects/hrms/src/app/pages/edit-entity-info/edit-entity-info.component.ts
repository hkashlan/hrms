import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  input,
  linkedSignal,
  Signal,
  viewChild,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ActionButton,
  DataGridComponent,
  EmptyObject,
  Entity,
  entityUtils,
  HeroIcons,
} from 'ui-kit';
import { DynamicFormComponent } from '../../../../../ui-kit/src/lib/form/form.component';
import { EntityKeys } from '../../entities/indext';
import { propertyType, propertyWithValidationInfo } from './entity-info';

@Component({
  selector: 'app-edit-entity-info',
  imports: [CommonModule, DataGridComponent, DynamicFormComponent, ReactiveFormsModule],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T extends EmptyObject = EmptyObject> {
  entity = input.required<EntityKeys>();

  entityInfo = linkedSignal(entityUtils.getEntitySignal<T>(this.entity));

  propertyWithValidationInfo = propertyWithValidationInfo;
  dlg = viewChild<ElementRef<HTMLDialogElement>>('editPropertyDlg');

  properties: Signal<propertyType[]> = computed(() => {
    const entityInfo = this.entityInfo();
    return entityUtils.getKeyProperties(entityInfo) as propertyType[];
  });

  actions: ActionButton<propertyType>[] = [
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
      action: (row) => {
        this.editProperty.setValue(row);
        this.dlg()?.nativeElement.showModal();
      },
    },
  ];

  selectProp = linkedSignal<propertyType[]>(() => this.properties());
  editProperty = new FormControl<propertyType | undefined>(undefined);
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
