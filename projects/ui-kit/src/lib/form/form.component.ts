import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { insertUserSchema } from '@hrms-server/db/schamas/users';
import { Entity } from 'ui-kit';
import { ZodFirstPartyTypeKind, ZodOptionalDef, ZodTypeDef } from 'zod';
import { zodToAngularForm } from '../../shared/zo-to-form';

@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="form()">
      <div *ngFor="let field of fields()">
        <label [for]="field">{{ field }}</label>
        <input *ngIf="field !== 'isAdmin'" [formControlName]="field" [type]="getFieldType(field)" />
        <input *ngIf="field === 'isAdmin'" [formControlName]="field" type="checkbox" />
      </div>
      <button [disabled]="form().invalid">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule, CommonModule],
})
export class DynamicFormComponent {
  entity = input.required<Entity>();

  form = computed(() => zodToAngularForm(this.entity().schema));
  fields = computed(() => Object.keys(this.entity().properties));

  getFieldType(field: string): string {
    type zodType = ZodTypeDef & { typeName: ZodFirstPartyTypeKind };
    function isZodOptional(x: ZodTypeDef): x is ZodOptionalDef {
      return 'typeName' in x && x.typeName === ZodFirstPartyTypeKind.ZodOptional;
    }
    let fieldType: zodType =
      this.entity().schema.shape[field as keyof typeof insertUserSchema.shape]?._def;

    while (isZodOptional(fieldType)) {
      fieldType = fieldType.innerType?._def;
    }
    if (fieldType?.typeName === ZodFirstPartyTypeKind.ZodString) return 'text';
    if (fieldType?.typeName === ZodFirstPartyTypeKind.ZodNumber) return 'number';
    if (fieldType?.typeName === 'ZodBoolean') return 'checkbox';
    return 'text';
  }
}
