import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shell/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavigationComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent {}
