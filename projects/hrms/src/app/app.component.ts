import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntityWithoutValidation } from '@hrms-server/model/entity.z';
import { NavigationComponent } from './shell/navigation/navigation.component';
import { trpc } from './trpc.client';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavigationComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    afterNextRender(() => {
      this.callServer();
    });
  }
  callServer() {
    const user: EntityWithoutValidation = {
      name: 'User',
      label: 'user',
      properties: {
        id: {
          type: 'primary',
          label: 'ID',
        },
        age: {
          type: 'number',
          label: 'Age',
          hooks: {
            list: {
              noFilter: true,
            },
          },
        },
        username: {
          type: 'text',
          label: 'Username',
        },
        email: {
          type: 'text',
          label: 'Email',
        },
        passwordHash: {
          type: 'text',
          label: 'Password',
          hooks: {
            list: {
              hidden: true,
            },
          },
        },
        gender: {
          type: 'select',
          label: 'Gender',
          options: ['male', 'female'],
        },
        married: {
          type: 'boolean',
          label: 'Married',
        },
        birthDate: {
          type: 'date',
          label: 'Birth Date',
        },
      },
    };
    // trpc.entity.save.mutate(user).then((res) => {
    //   console.log(res);
    // });
    // this.callMutation();
  }

  async callMutation() {
    const user = await trpc.user.getById.query({ id: 11 });
    await trpc.user.update.mutate({ ...user });
  }
}
