import { JsonPipe, NgComponentOutlet } from '@angular/common';
import { Component, computed, effect, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxDirective } from 'daisyui';
import { Subscription } from 'rxjs';
import { EmptyObject, Entity, entityUtils } from 'ui-kit';
import { AgeComponent } from '../../../../hrms/src/app/pages/entities/user/detail/age/age.component';
import { zodToAngularForm } from '../../shared/zo-to-form';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'lib-dynamic-form',
  template: `
    {{ form().value | json }}
    <form [formGroup]="form()">
      <fieldset class="fieldset">
        @for (field of fields(); track $index) {
          @let key = $any(field.key);
          <label class="fieldset-label">{{ field.key }}</label>
          @if (field.property.hooks?.details?.component; as component) {
            <ng-container
              [ngComponentOutlet]="component"
              [ngComponentOutletInputs]="{
                record: form().value,
                formControl: form().controls[key],
              }"
            ></ng-container>
          } @else {
            @switch (field.property.type) {
              @case ('boolean') {
                <input type="checkbox" duiCheckbox [formControlName]="key" />
              }

              @case ('date') {
                <input type="date" class="input" [formControlName]="key" />
              }

              @case ('select') {
                <select class="select" [formControlName]="key">
                  <!-- @for (option of field.property.property.options; track option) {
                    <option [value]="option">{{ option }}</option>
                  } -->
                </select>
              }

              @case ('number') {
                <input type="number" class="input" [formControlName]="key" />
              }

              @case ('autocomplete') {
                <app-autocomplete></app-autocomplete>
              }

              @default {
                <input [type]="field.property.type" class="input" [formControlName]="key" />
              }
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
  imports: [
    ReactiveFormsModule,
    CheckboxDirective,
    NgComponentOutlet,
    JsonPipe,
    AutocompleteComponent,
  ],
})
export class DynamicFormComponent<T extends EmptyObject = EmptyObject>
  implements ControlValueAccessor
{
  ageComponent = AgeComponent;
  entity = input.required<Entity<T>>();
  entityChanged = output<T | null>();

  form = computed(() => {
    const tt = zodToAngularForm(this.entity().schema);
    return tt;
  });

  fields = computed(() => {
    const tt = this.prepareFields();
    return tt;
  });
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
          this.entityChanged.emit(null);
        } else {
          this.onChange(value);
          this.entityChanged.emit(value);
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
