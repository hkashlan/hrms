import { Component, computed, effect, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxDirective } from 'daisyui';
import { Subscription } from 'rxjs';
import { Entity } from 'ui-kit';
import { zodToAngularForm } from '../../shared/zo-to-form';

@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="form()">
      <!-- <fieldset class="fieldset"> -->
      @for (field of fields(); track $index) {
        <div>
          <label class="fieldset-label">{{ field.key }}</label>
          @switch (field.property.property.type) {
            @case ('boolean') {
              <input duiCheckbox [formControlName]="field.key" />
            }

            @case ('date') {
              <input type="date" class="input" [formControlName]="field.key" />
            }

            @case ('select') {
              <select class="select" [formControlName]="field.key">
                <!-- @for (option of field.property.property.options; track option) {
                  <option [value]="option">{{ option }}</option>
                } -->
              </select>
            }

            @case ('number') {
              <input type="number" class="input" [formControlName]="field.key" />
            }

            @default {
              <input
                [type]="field.property.property.type"
                class="input"
                [formControlName]="field.key"
              />
            }
          }
        </div>
        <br />
      }
      <!-- </fieldset> -->
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
export class DynamicFormComponent<T> implements ControlValueAccessor {
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
    return Object.keys(this.entity().properties)
      .filter((key) => key !== 'id')
      .map((key) => {
        return {
          key: key,
          property: this.entity().properties[key as keyof T],
        };
      });
  }
}
