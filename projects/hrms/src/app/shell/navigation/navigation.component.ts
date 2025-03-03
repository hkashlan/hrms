import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationItem } from './navigation';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  navigations = input.required<NavigationItem[]>();
}
