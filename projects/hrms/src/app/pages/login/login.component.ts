import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';


  @Component({
    selector: 'app-login',
    imports: [MatGridListModule, MatInputModule, MatButtonModule,FormsModule,ReactiveFormsModule,CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
  })
  export class LoginComponent implements OnInit {
    username!:FormGroup;
    constructor(private fb: FormBuilder) { }
    ngOnInit(): void {
      this.login();
    }
    login(){
      this.username=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
    }
    sumbit(){
      const modul={
        email:this.username.value.email,
        password:this.username.value.password,
      }
      this.username.reset()
      console.log(modul)
    }
  };

