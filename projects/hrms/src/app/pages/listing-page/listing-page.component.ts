import { afterNextRender, Component, signal } from '@angular/core';
import { User } from '@hrms-server/db/schamas';
import { DataGridComponent, Entity } from 'ui-kit';
import { userInfo } from '../../entities/user.entity';
import { trpc } from '../../trpc.client';

@Component({
  imports: [DataGridComponent],
  template: `
    <lib-data-grid [entity]="userInfo" [data]="users()" />
  `,
})
export class ListingPageComponent {
  users = signal<User[]>([]);
  userInfo: Entity<User> = userInfo;

  constructor() {
    afterNextRender(() => {
      this.callServer();
    });
  }

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
    const users = await trpc.user.list.query({
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
    this.users.set(users);
    // console.log(this.users);

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
