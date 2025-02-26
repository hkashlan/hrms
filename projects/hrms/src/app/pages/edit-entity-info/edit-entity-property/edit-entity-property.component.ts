import { Component, computed, ElementRef, input, Signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BaseBaseProperty,
  BaseValidateProperty,
  Property,
  SelectProperty,
} from '@hrms-server/model/property.z';
import { DynamicFormComponent, Entity } from 'ui-kit';
import { z } from 'zod';
import { KeyProperty } from '../edit-entity-info.component';

@Component({
  selector: 'app-edit-entity-property',
  imports: [DynamicFormComponent, ReactiveFormsModule],
  templateUrl: './edit-entity-property.component.html',
  styleUrl: './edit-entity-property.component.scss',
})
export class EditEntityPropertyComponent {
  property = input.required<KeyProperty>();

  dlg = viewChild<ElementRef>('editPropertyDlg');

  propertyInfo: Signal<Entity<Partial<BaseBaseProperty>>> = computed(() => {
    const labelProp: BaseValidateProperty = {
      type: 'text',
      label: 'Label',
    };
    const nameProp: BaseValidateProperty = {
      type: 'text',
      label: 'name',
    };
    const typeProp: SelectProperty = {
      type: 'select',
      label: 'type',
      options: ['text', 'number', 'date', 'boolean', 'select', 'textarea', 'autocomplete'],
    };

    // notNull
    // min
    // max
    // select: array

    return {
      name: this.property().key,
      label: this.property().property.label,
      schema: z.object({
        label: z.string().regex(/^[a-zA-Z0-9_]+$/),
        name: z.string(),
        type: z.enum(['text', 'number', 'date', 'boolean', 'select', 'textarea', 'autocomplete']),
      }),
      properties: {
        type: typeProp,
        label: labelProp,
        name: nameProp,
      },
    };
  });
  propertyControl = new FormControl(null as Property | null);
}
