import { Component } from '@angular/core';
import { ButtonDirective } from 'daisyui';

@Component({
  selector: 'app-daisyui',
  imports: [ButtonDirective],
  templateUrl: './daisyui.component.html',
  styleUrl: './daisyui.component.scss',
})
export class DaisyuiComponent {}
