import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { User } from '@hrms-server/db/schamas/users';
import { Entity } from 'ui-kit';
import { userInfo } from './entities/user.entity';
import { NavigationComponent } from './shell/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [MatSlideToggleModule, ReactiveFormsModule, RouterOutlet, NavigationComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hrms';
  users = signal<User[]>([]);
  userInfo: Entity<User> = userInfo;
  userControl = new FormControl(null as User | null);

  async insertUser() {
    //       label: 'Password',
  }
}
