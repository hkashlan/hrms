import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonDirective } from 'daisyui';
import { NavigationItem } from './navigation';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, ButtonDirective],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  navigations = input.required<NavigationItem[]>();
}
