import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { User } from '@hrms-server/db/schamas/users';
import { SignupComponent } from './pages/signup/signup.component';
import { trpc } from './trpc.client';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [MatSlideToggleModule, RouterOutlet, SignupComponent, JsonPipe],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hrms';
  users: User[] = [];
  async callServer() {
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
