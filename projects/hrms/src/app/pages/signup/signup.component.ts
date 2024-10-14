import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { trpc } from '../../trpc.client';

type FirstParam<T> = T extends (x: infer U, ...args: any[]) => any ? U : never;
type inputUser = FirstParam<typeof trpc.signup.mutate>;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  userForm = new FormGroup({
    username: new FormControl('admin', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('admin@admin.com', [Validators.required, Validators.email]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.userForm.valid) {
      const user: inputUser = this.userForm.getRawValue() as inputUser;
      trpc.signup.mutate(user);
    } else {
      console.log('Form is invalid');
    }
  }
}
