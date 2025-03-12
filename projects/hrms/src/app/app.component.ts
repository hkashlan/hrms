import { Component } from '@angular/core';
import { entityInfos } from './entities/indext';
import { NavigationItem } from './shell/navigation/navigation';
import { NavigationComponent } from './shell/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavigationComponent],
  styleUrl: './app.component.scss',
  host: {
    class: 'min-h-screen bg-base-200',
  },
})
export class AppComponent {
  navigationItems: NavigationItem[] = [
    {
      label: 'daisyui',
      route: './daisyui',
    },
    {
      label: 'edit gui',
      route: './edit-entity/user',
    },
  ];

  constructor() {
    Object.values(entityInfos).forEach((entity) => {
      this.navigationItems.push({
        label: entity.label,
        route: `./${entity.name}/list`,
      });
    });
  }
  // constructor() {
  //   afterNextRender(() => {
  //     this.callServer();
  //   });
  // }
  // callServer() {
  //   const user: EntityWithoutValidation = {
  //     name: 'User',
  //     label: 'user',
  //     properties: {
  //       id: {
  //         type: 'primary',
  //         label: 'ID',
  //       },
  //       age: {
  //         type: 'number',
  //         label: 'Age',
  //         hooks: {
  //           list: {
  //             noFilter: true,
  //           },
  //         },
  //       },
  //       username: {
  //         type: 'text',
  //         label: 'Username',
  //       },
  //       email: {
  //         type: 'text',
  //         label: 'Email',
  //       },
  //       passwordHash: {
  //         type: 'text',
  //         label: 'Password',
  //         hooks: {
  //           list: {
  //             hidden: true,
  //           },
  //         },
  //       },
  //       gender: {
  //         type: 'select',
  //         label: 'Gender',
  //         options: ['male', 'female'],
  //       },
  //       married: {
  //         type: 'boolean',
  //         label: 'Married',
  //       },
  //       birthDate: {
  //         type: 'date',
  //         label: 'Birth Date',
  //       },
  //     },
  //   };
  //   // trpc.entity.save.mutate(user).then((res) => {
  //   //   console.log(res);
  //   // });
  //   // this.callMutation();
  // }

  // async callMutation() {
  //   const user = await trpc.user.getById.query({ id: 11 });
  //   await trpc.user.update.mutate({ ...user });
  // }
}
