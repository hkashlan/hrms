import { Component, input } from '@angular/core';
import { PropertyInputType, PropertyType } from '../../../model/property';

@Component({
  selector: 'lib-column-filter',
  imports: [],
  templateUrl: './column-filter.component.html',
  styleUrl: './column-filter.component.css',
})
export class ColumnFilterComponent {
  type = input.required<PropertyType | PropertyInputType>();
}
