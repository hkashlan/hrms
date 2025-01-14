import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, effect, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Entity } from 'ui-kit';
import { zodToAngularForm } from '../../shared/zo-to-form';

@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="form()">
      @for (field of fields(); track $index) {
        @switch (field.property.property.type) {
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

          @case ('select') {
            <mat-form-field>
              <mat-label>Favorite food</mat-label>
              <mat-select [formControlName]="field.key">
                @for (option of field.property.property.options; track option) {
                  <mat-option [value]="option">{{ option }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          }

          @case ('number') {
            <mat-form-field>
              <mat-label>{{ field.key }}</mat-label>
              <input matInput type="number" [formControlName]="field.key" />
            </mat-form-field>
          }

          @default {
            <mat-form-field>
              <mat-label>{{ field.key }}</mat-label>
              <input matInput [formControlName]="field.key" [type]="field.property.property.type" />
            </mat-form-field>
          }
        }
      }
    </form>
    <div *ngIf="form().invalid && form().touched">
      <h3>Form Errors:</h3>
      <ul>
        <li *ngFor="let error of getFormErrors()">{{ error }}</li>
      </ul>
    </div>
  `,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true,
    },
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    JsonPipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
  ],
  styleUrls: ['./form.component.scss'],
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
