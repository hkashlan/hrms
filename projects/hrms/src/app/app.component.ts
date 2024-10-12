import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trpc } from './trpc.client';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [MatSlideToggleModule, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hrms';

  async callServer() {
    const user = await trpc.getUser.query('1');
    console.log(user);
  }
}
