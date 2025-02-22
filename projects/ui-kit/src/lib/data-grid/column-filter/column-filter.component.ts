import { Component, computed, input } from '@angular/core';
import { PropertyInputType, PropertyType } from '@hrms-server/model/property.schema';

@Component({
  selector: 'lib-column-filter',
  imports: [],
  templateUrl: './column-filter.component.html',
  styleUrl: './column-filter.component.css',
})
export class ColumnFilterComponent {
  type = input.required<PropertyType | PropertyInputType>();
  options = computed(() => {
    const type = this.type();
    if (type === 'number') {
      return ['<', '>', '<=', '>=', '='];
    } else if (type === 'date') {
      return ['<', '>', '<=', '>=', '='];
    } else if (type === 'text') {
      return ['contains', 'starts with', 'endsWith', '='];
    } else if (type === 'boolean') {
      return ['='];
    }
    return [];
  });
}
