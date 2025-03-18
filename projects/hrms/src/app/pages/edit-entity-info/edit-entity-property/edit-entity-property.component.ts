import { Component, computed, ElementRef, input, Signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BaseBaseProperty,
  BaseProperty,
  Property,
  SelectProperty,
} from '@hrms-server/model/property.z';
import { DynamicFormComponent, Entity, KeyProperty } from 'ui-kit';
import { z } from 'zod';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'app-edit-entity-property',
  imports: [DynamicFormComponent, ReactiveFormsModule],
  templateUrl: './edit-entity-property.component.html',
  styleUrl: './edit-entity-property.component.scss',
})
export class EditEntityPropertyComponent {
  property = input.required<KeyProperty<any>>();

  dlg = viewChild<ElementRef>('editPropertyDlg');

  propertyInfo: Signal<Entity<Partial<BaseBaseProperty>>> = computed(() => {
    const labelProp: BaseProperty = {
      type: 'text',
      label: 'Label',
      validation: z.string().regex(/^[a-zA-Z0-9_]+$/),
    };
    const nameProp: BaseProperty = {
      type: 'text',
      label: 'name',
      validation: z.string().regex(/^[a-zA-Z0-9_]+$/),
    };

    const typeProp: SelectProperty = {
      type: 'select',
      label: 'type',
      options: ['text', 'number', 'date', 'boolean', 'select', 'textarea', 'autocomplete'],
      validation: z.string(),
    };
    const notNullProp: BaseProperty = {
      type: 'boolean',
      label: 'required',
      validation: z.boolean(),
    };
    const minProp: BaseProperty = {
      type: 'number',
      label: 'min value',
      validation: z.number(),
    };
    const maxProp: BaseProperty = {
      type: 'number',
      label: 'min value',
      validation: z.number(),
    };

    const selectProp: BaseProperty = {
      type: 'select',
      label: 'options',
      hooks: {
        details: {
          component: OptionsComponent,
        },
      },
      validation: z.array(z.string()),
    };
    // notNull
    // min
    // max
    // select: array

    return {
      name: this.property().key,
      label: this.property().label,
      schema: z.object({
        name: nameProp.validation!,
        label: labelProp.validation!,
        type: labelProp.validation!,
        notNull: notNullProp.validation!,
        min: minProp.validation!,
        max: maxProp.validation!,
        options: selectProp.validation!,
      }),
      properties: {
        type: typeProp as unknown as BaseProperty,
        label: labelProp,
        name: nameProp,
        notNull: notNullProp,
        min: minProp,
        max: maxProp,
        options: selectProp,
      },
    } as Entity<Partial<BaseBaseProperty>>;
  });
  propertyControl = new FormControl(null as Property | null);
}
