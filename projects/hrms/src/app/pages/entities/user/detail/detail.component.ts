import { afterNextRender, Component, computed, input, numberAttribute } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '@hrms-server/db/schamas';
import { ButtonDirective } from 'daisyui';
import { DynamicFormComponent, Entity } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [DynamicFormComponent, ReactiveFormsModule, ButtonDirective, RouterModule],
  template: `
    <lib-dynamic-form [entity]="userInfo" [formControl]="userControl" />

    <div class="flex mt-4 gap-2">
      <button
        [duiButton]="'btn-primary'"
        [disabled]="userControl.invalid || userControl.pristine"
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
export class UserDetailComponent {
  id = input(undefined, { transform: numberAttribute });
  validId = computed(() => this.id() !== undefined && !Number.isNaN(this.id()));

  userInfo: Entity<User> = userInfo;
  userControl = new FormControl(null as User | null);

  constructor() {
    afterNextRender(() => {
      const id = this.id();
      if (this.validId()) {
        return;
      }
      trpc.entities.user.getById.query(id!).then((user) => {
        this.userControl.setValue(user);
        this.userControl.markAsPristine();
      });
    });
  }

  save() {
    const user = this.userControl.value;
    if (this.userControl.invalid || !user) {
      return;
    }
    const id = this.id();
    if (this.validId()) {
      user.id = id!;
      trpc.entities.user.update.mutate(user).then(() => {
        this.userControl.markAsPristine();
      });
    } else {
      const { id, ...newUser } = user;
      newUser.gender = 'male';
      trpc.entities.user.create.mutate(newUser).then(() => {
        this.userControl.markAsPristine();
      });
    }
  }
}
