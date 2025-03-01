import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '@hrms-server/db/schamas';
import { DynamicFormComponent, Entity } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';

@Component({
  imports: [DynamicFormComponent, ReactiveFormsModule],
  template: `
    <lib-dynamic-form [entity]="userInfo" [formControl]="userControl" />
  `,
})
export class UserDetailComponent {
  userInfo: Entity<User> = userInfo;
  userControl = new FormControl(null as User | null);
}
