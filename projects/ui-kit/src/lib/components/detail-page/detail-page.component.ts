import {
  afterNextRender,
  Component,
  computed,
  input,
  numberAttribute,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonDirective } from 'daisyui';
import { DynamicFormComponent } from '../form/form.component';
import { DetailPageConfig } from './detail-page';

@Component({
  selector: 'lib-detial-page',
  imports: [DynamicFormComponent, ReactiveFormsModule, ButtonDirective, RouterModule],
  template: `
    <lib-dynamic-form [entity]="config().entity" [formControl]="recordForm" />

    <div class="flex mt-4 gap-2">
      <button
        [duiButton]="'btn-primary'"
        [disabled]="recordForm.invalid || recordForm.pristine"
        (click)="save()"
      >
        Save
      </button>
      <button [duiButton]="'btn-secondary'" [routerLink]="[validId() ? '../../list' : '../list']">
        Cancel
      </button>
    </div>
  `,
})
export class DetailPageComponent<T extends { id: number }> {
  id = input(undefined, { transform: numberAttribute });
  saved = output<T | null>();
  canceled = output<void>();
  config = input.required<DetailPageConfig<T>>();

  validId = computed(() => this.id() !== undefined && !Number.isNaN(this.id()));
  recordForm = new FormControl(null as T | null, { validators: Validators.required });

  constructor() {
    afterNextRender(() => {
      const id = this.id();
      if (!this.validId()) {
        return;
      }
      this.config()
        .getById(id!)
        .then((user) => {
          this.recordForm.setValue(user);
          this.recordForm.markAsPristine();
        });
    });
  }

  save() {
    const user = this.recordForm.value;
    if (this.recordForm.invalid || !user) {
      return;
    }
    const id = this.id();
    if (this.validId()) {
      user.id = id!;
      this.config()
        .update(user)
        .then((record) => {
          this.recordForm.markAsPristine();
          this.saved.emit(record);
        });
    } else {
      const { id, ...newUser } = user;
      this.config()
        .create(newUser)
        .then(() => {
          this.recordForm.markAsPristine();
          this.canceled.emit();
        });
    }
  }
}
