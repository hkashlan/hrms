import { Component, computed, ElementRef, input, Signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BaseBaseProperty,
  BaseValidateProperty,
  Property,
  SelectProperty,
} from '@hrms-server/model/property.z';
import { DynamicFormComponent, Entity, KeyProperty } from 'ui-kit';
import { z } from 'zod';

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
    const labelProp: BaseValidateProperty = {
      type: 'text',
      label: 'Label',
      validation: z.string().regex(/^[a-zA-Z0-9_]+$/),
    };
    const nameProp: BaseValidateProperty = {
      type: 'text',
      label: 'name',
      validation: z.string().regex(/^[a-zA-Z0-9_]+$/),
    };

    const typeProp: SelectProperty = {
      type: 'select',
      label: 'type',
      options: ['text', 'number', 'date', 'boolean', 'select', 'textarea', 'autocomplete'],
    };
    const notNullProp: BaseValidateProperty = {
      type: 'boolean',
      label: 'required',
      validation: z.boolean(),
    };
    const minProp: BaseValidateProperty = {
      type: 'number',
      label: 'min value',
      validation: z.number(),
    };
    const maxProp: BaseValidateProperty = {
      type: 'number',
      label: 'min value',
      validation: z.number(),
    };
    // notNull
    // min
    // max
    // select: array

    return {
      name: this.property().key,
      label: this.property().property.label,
      schema: z.object({
        name: nameProp.validation,
        label: labelProp.validation,
        type: z.string(),
        notNull: notNullProp.validation,
        min: minProp.validation,
        max: maxProp.validation,
      }),
      properties: {
        type: typeProp as unknown as BaseValidateProperty,
        label: labelProp,
        name: nameProp,
        notNull: notNullProp,
        min: minProp,
        max: maxProp,
      },
    } as Entity<Partial<BaseBaseProperty>>;
  });
  propertyControl = new FormControl(null as Property | null);
}
