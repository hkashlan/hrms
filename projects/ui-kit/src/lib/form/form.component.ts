import { Component, computed, effect, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxDirective } from 'daisyui';
import { Subscription } from 'rxjs';
import { EmptyObject, Entity, entityUtils } from 'ui-kit';
import { zodToAngularForm } from '../../shared/zo-to-form';

@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="form()">
<<<<<<< HEAD
<<<<<<< HEAD
      <!-- <fieldset class="fieldset"> -->
      @for (field of fields(); track $index) {
        <div>
=======
      <fieldset class="fieldset">
        @for (field of fields(); track $index) {
          @let key = $any(field.key);
>>>>>>> main
=======
      <fieldset class="fieldset ai-style-change-1 block">
        @for (field of fields(); track $index) {
          @let key = $any(field.key);
>>>>>>> 5a3f46b315d73011ccf29aefd518803b8801b084
          <label class="fieldset-label">{{ field.key }}</label>
          @switch (field.property.type) {
            @case ('boolean') {
              <input duiCheckbox [formControlName]="key" />
            }

            @case ('date') {
              <input type="date" class="input" [formControlName]="key" />
            }

            @case ('select') {
<<<<<<< HEAD
<<<<<<< HEAD
              <select class="select" [formControlName]="field.key">
                <!-- @for (option of field.property.options; track option) {
=======
              <select class="select" [formControlName]="key">
                <!-- @for (option of field.property.property.options; track option) {
>>>>>>> main
=======
              <select class="select" [formControlName]="key">
                <!-- @for (option of field.property.property.options; track option) {
>>>>>>> 5a3f46b315d73011ccf29aefd518803b8801b084
                  <option [value]="option">{{ option }}</option>
                } -->
              </select>
            }

            @case ('number') {
              <input type="number" class="input" [formControlName]="key" />
            }

            @default {
<<<<<<< HEAD
<<<<<<< HEAD
              <input [type]="field.property.type" class="input" [formControlName]="field.key" />
=======
              <input [type]="field.property.type" class="input" [formControlName]="key" />
>>>>>>> main
=======
              <input [type]="field.property.type" class="input" [formControlName]="key" />
>>>>>>> 5a3f46b315d73011ccf29aefd518803b8801b084
            }
          }
        }
      </fieldset>
    </form>
    @if (form().invalid && form().touched) {
      <h3>Form Errors:</h3>
      <ul>
        @for (error of getFormErrors(); track error) {
          <li>{{ error }}</li>
        }
      </ul>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true,
    },
  ],
  imports: [ReactiveFormsModule, CheckboxDirective],
})
export class DynamicFormComponent<T extends EmptyObject = EmptyObject>
  implements ControlValueAccessor
{
  entity = input.required<Entity<T>>();

  form = computed(() => zodToAngularForm(this.entity().schema));

  fields = computed(() => this.prepareFields());
  formSubscription: Subscription | null = null;

  onChange = (value: T | null) => {};

  constructor() {
    this.listenToFormChanges();
  }
  private listenToFormChanges() {
    effect(() => {
      if (this.formSubscription) {
        this.formSubscription.unsubscribe();
      }
      this.formSubscription = this.form().valueChanges.subscribe((value) => {
        if (this.form().invalid) {
          this.onChange(null);
        } else {
          this.onChange(value);
        }
      });
    });
  }

  writeValue(obj: T): void {
    this.form().patchValue(obj as any, { emitEvent: false });
  }
  registerOnChange(fn: DynamicFormComponent<T>['onChange']): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}

  getFormErrors() {
    const errors: string[] = [];
    Object.keys(this.form().controls).forEach((key) => {
      const controlErrors = this.form().get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((errorKey) => {
          switch (errorKey) {
            case 'required':
              errors.push(`${key} is required.`);
              break;
            case 'email':
              errors.push(`${key} must be a valid email.`);
              break;
            case 'minlength':
              const min = controlErrors['minlength'].requiredLength;
              errors.push(`${key} must be at least ${min} characters long.`);
              break;
            default:
              errors.push(`${key} has an invalid value.`);
              break;
          }
        });
      }
    });
    return errors;
  }

  private prepareFields() {
    return entityUtils
      .getKeyProperties<T>(this.entity())
      .filter((keyProperty) => keyProperty.key !== 'id');
  }
}
