import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Entity } from 'ui-kit';
import { ZodFirstPartyTypeKind, ZodOptionalDef, ZodTypeDef } from 'zod';
import { PropertyInputType, PropertyType } from '../../model/property';
import { zodToAngularForm } from '../../shared/zo-to-form';

@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="form()">
      @for (field of fields(); track $index) {
        @switch (field.property.type) {
          @case ('boolean') {
            <mat-checkbox [formControlName]="field.key">{{ field.key }}</mat-checkbox>
          }

          @case ('date') {
            <mat-form-field>
              <mat-label>Choose a date</mat-label>
              <input matInput [formControlName]="field.key" [matDatepicker]="picker" />
              <mat-hint>MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          }

          @default {
            <mat-form-field>
              <mat-label>{{ field.key }}</mat-label>
              <input matInput [formControlName]="field.key" [type]="field.property.type" />
            </mat-form-field>
          }
        }
      }
      <button [disabled]="form().invalid">Submit</button>
    </form>
    {{ form().value | json }}
  `,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    JsonPipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  styleUrls: ['./form.component.scss'],
})
export class DynamicFormComponent {
  entity = input.required<Entity>();

  form = computed(() => zodToAngularForm(this.entity().schema));

  fields = computed(() => this.prepareFields());

  private prepareFields() {
    return Object.keys(this.entity().properties).map((key) => {
      return {
        key: key,
        property: this.entity().properties[key],
      };
    });
  }

  getFieldType(
    field: keyof ReturnType<DynamicFormComponent['entity']>['properties'],
  ): PropertyType | PropertyInputType {
    type zodType = ZodTypeDef & { typeName: ZodFirstPartyTypeKind };
    function isZodOptional(x: ZodTypeDef): x is ZodOptionalDef {
      return 'typeName' in x && x.typeName === ZodFirstPartyTypeKind.ZodOptional;
    }
    function isZodNullable(x: ZodTypeDef): x is ZodOptionalDef {
      return 'typeName' in x && x.typeName === ZodFirstPartyTypeKind.ZodNullable;
    }

    return this.entity().properties[field as any].type;
    // let fieldType: zodType =
    //   this.entity().schema.shape[field as keyof typeof insertUserSchema.shape]?._def;

    // while (isZodOptional(fieldType) || isZodNullable(fieldType)) {
    //   fieldType = fieldType.innerType?._def;
    // }

    // console.log('field', field, 'field type ', fieldType?.typeName);
    // if (fieldType?.typeName === ZodFirstPartyTypeKind.ZodString) return 'text';
    // if (fieldType?.typeName === ZodFirstPartyTypeKind.ZodNumber) return 'number';
    // if (fieldType?.typeName === 'ZodBoolean') return 'checkbox';
    // return 'text';
  }
}
