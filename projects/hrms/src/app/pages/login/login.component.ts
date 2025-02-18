import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  class="input input-bordered"
                  formControlName="email"
                />
                @if (
                  loginForm.get('email')?.invalid &&
                  (loginForm.get('email')?.dirty || loginForm.get('email')?.touched)
                ) {
                  <p class="text-red-500 text-sm">
                    @if (loginForm.get('email')?.errors?.['required']) {
                      Email is required.
                    } @else if (loginForm.get('email')?.errors?.['email']) {
                      Invalid email format.
                    }
                  </p>
                }
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  class="input input-bordered"
                  formControlName="password"
                />
                @if (
                  loginForm.get('password')?.invalid &&
                  (loginForm.get('password')?.dirty || loginForm.get('password')?.touched)
                ) {
                  <p class="text-red-500 text-sm">Password is required.</p>
                }
                <label class="label">
                  <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div class="form-control mt-6">
                <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {{ loginForm.value | json }}
  `,
  imports: [ReactiveFormsModule, JsonPipe],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle form submission (e.g., API call)
      console.log(this.loginForm.value); // Log form values for now
    }
  }
}
