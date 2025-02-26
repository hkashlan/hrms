import { Component, computed, ElementRef, input, Signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseBaseProperty, BaseValidateProperty, Property } from '@hrms-server/model/property.z';
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
      property: {
        type: 'text',
        label: 'Label',
      },
    };
    const nameProp: BaseValidateProperty = {
      property: {
        type: 'text',
        label: 'name',
      },
    };

    return {
      name: this.property().key,
      label: this.property().property.property.label,
      schema: z.object({
        label: z.string(),
        name: z.string(),
      }),
      properties: {
        label: labelProp,
        name: nameProp,
      },
    };
  });
  propertyControl = new FormControl(null as Property | null);
}
