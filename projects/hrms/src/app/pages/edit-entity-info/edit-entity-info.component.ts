import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  input,
  linkedSignal,
  Signal,
  viewChild,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'daisyui';
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
import { trpc } from '../../trpc.client';
import {
  entityInfosValidation,
  entityType,
  propertyType,
  propertyWithValidationInfo,
} from './entity-info';

@Component({
  selector: 'app-edit-entity-info',
  imports: [
    CommonModule,
    DataGridComponent,
    DynamicFormComponent,
    ReactiveFormsModule,
    ButtonDirective,
  ],
  templateUrl: './edit-entity-info.component.html',
  styleUrl: './edit-entity-info.component.scss',
})
export class EditEntityInfoComponent<T extends EmptyObject = EmptyObject> {
  icons = HeroIcons;
  propertyWithValidationInfo = propertyWithValidationInfo;
  entityInfosValidation = entityInfosValidation;

  entity = input.required<EntityKeys>();
  entityInfo = linkedSignal(entityUtils.getEntitySignal<T>(this.entity));

  entityForm = new FormControl<entityType | null>(null, [Validators.required]);
  editProperty = new FormControl<(propertyType & { index?: number }) | undefined>(undefined, [
    Validators.required,
  ]);

  dlg = viewChild<ElementRef<HTMLDialogElement>>('editPropertyDlg');

  properties: Signal<propertyType[]> = computed(
    () => entityUtils.getKeyProperties(this.entityInfo()) as propertyType[],
  );

  actions: ActionButton<propertyType>[] = this.initializeActionButtons();

  constructor() {
    this.entityForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((entity) => {
      this.entityInfo.update((entityInfo) => ({
        ...entityInfo,
        name: entity!.name,
        label: entity!.label,
      }));
    });

    afterNextRender(() => {
      this.entityForm.setValue({ name: this.entityInfo().name, label: this.entityInfo().label });
    });
  }

  upRow(index: number) {
    const properties = this.properties();
    const [property] = properties.splice(index, 1);
    properties.splice(index - 1, 0, property);
    this.updateEntityInfos(properties);
  }

  downRow(index: number) {
    this.upRow(index + 1);
  }

  addProperty() {
    this.showDialog({
      type: 'text',
      key: '' as any,
      label: '',
    });
  }

  saveProperty() {
    const { index, ...property } = this.editProperty.value || {};
    if (!property) {
      return;
    }
    const properties = this.properties();
    if (index !== undefined) {
      properties[index] = { ...properties[index], ...property };
    } else {
      properties.push(property as propertyType);
    }
    this.updateEntityInfos(properties);
    this.editProperty.setValue(undefined);
    this.dlg()?.nativeElement.close();
  }

  saveEntity() {
    const tt = JSON.parse(JSON.stringify(this.entityInfo()));
    console.log('tt', tt);
    Object.values(tt.properties).forEach((property) => {
      delete (property as any).validation;
    });
    delete tt.schema;
    trpc.entity.save.mutate(tt).then(() => {
      this.entityInfo.update((entityInfo) => ({
        ...entityInfo,
        name: this.entityForm.value!.name,
        label: this.entityForm.value!.label,
      }));
    });
  }

  private updateEntityInfos(properties: propertyType[]) {
    const entityInfos = this.entityInfo();
    entityInfos.properties = properties.reduce(
      (acc, prop) => ({ ...acc, [prop.key]: prop }),
      {} as Entity<T>['properties'],
    );
    this.entityInfo.set(entityInfos);
  }

  private showDialog(row: propertyType = {} as propertyType, index?: number) {
    this.editProperty.setValue({ ...row, index });
    this.dlg()?.nativeElement.showModal();
  }
  private initializeActionButtons(): ActionButton<propertyType>[] {
    return [
      {
        icon: HeroIcons.arrowDown,
        action: (row, index) => this.downRow(index),
      },
      {
        icon: HeroIcons.arrowUp,
        action: (_row, index) => this.upRow(index),
      },
      {
        icon: HeroIcons.pencil,
        action: (row, index) => this.showDialog(row, index),
      },
    ];
  }
}
