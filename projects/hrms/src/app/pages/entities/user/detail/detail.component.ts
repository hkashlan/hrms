import { afterNextRender, Component, input, numberAttribute } from '@angular/core';
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

    <button [duiButton]="'btn-primary'" [disabled]="userControl.invalid">Save</button>
    <button [duiButton]="'btn-secondary'" [routerLink]="['../../list']">Cancel</button>
  `,
})
export class UserDetailComponent {
  id = input(undefined, { transform: numberAttribute });

  userInfo: Entity<User> = userInfo;
  userControl = new FormControl(null as User | null);

  constructor() {
    afterNextRender(() => {
      const id = this.id();
      if (id === undefined) {
        return;
      }
      trpc.entities.user.getById.query(id).then((user) => {
        this.userControl.setValue(user);
        this.userControl.markAsPristine();
      });
    });
  }
}
