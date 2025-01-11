import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { User } from '@hrms-server/db/schamas/users';
import { DynamicFormComponent, Entity, UiKitComponent } from 'ui-kit';
import { userInfo } from './entities/user.entity';
import { SignupComponent } from './pages/signup/signup.component';
import { trpc } from './trpc.client';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    MatSlideToggleModule,
    RouterOutlet,
    SignupComponent,
    JsonPipe,
    UiKitComponent,
    DynamicFormComponent,
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hrms';
  users: User[] = [];
  userInfo: Entity<User> = userInfo;

  async callServer() {
    // const userInfo: Entity<typeof insertUserSchema.shape> = {
    //   name: 'User',
    //   properties: {
    //     age: {
    //       type: 'number',
    //       label: 'Age',
    //       validation: insertUserSchema.shape.age,
    //     },
    //     username: {
    //       type: 'text',
    //       label: 'Username',
    //     },
    //     email: {
    //       type: 'text',
    //       label: 'Email',
    //     },
    //     passwordHash: {
    //       type: 'text',
    //       label: 'Password',
    //     },
    //   },
    // };
    // const user = await trpc.login.mutate({ email: 'admin@admin.com', password: '123456' });
    // await trpc.login.mutate({
    //   email: 'tt@tt.com',
    //   password: '123',
    // });
    this.users = await trpc.user.list.query({
      // or: [
      //   {
      //     and: [
      //       {
      //         username: { startsWith: 'John' },
      //         age: { lte: 40 },
      //       },
      //     ],
      //   },
      //   {
      //     username: { startsWith: 'hadi' },
      //   },
      // ],
    });

    console.log(this.users);

    // await trpc.user.create.mutate({
    //   email: 'sd',
    //   username: 'sd',
    //   passwordHash: 'sd',
    //   age: 12,
    // });
    // await trpc.user.update.mutate({
    //   id: 1,
    //   email: 'sd',
    //   username: 'sd',
    //   passwordHash: 'sd',
    //   age: 12,
    // });

    // await trpc.user.delete.mutate({ id: 1 });
    // console.log(tt);
  }
}
