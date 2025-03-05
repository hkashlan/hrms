import { Component, computed, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyInputType, PropertyType } from '@hrms-server/model/property.z';

const filter2Word = {
  lt: 'less than',
  gt: 'greater than',
  lte: 'less than or equal to',
  gte: 'greater than or equal to',
  contains: 'contains',
  startsWith: 'starts with',
  endsWith: 'ends with',
  equal: '=',
};

@Component({
  selector: 'lib-column-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './column-filter.component.html',
  styleUrl: './column-filter.component.css',
})
export class ColumnFilterComponent {
  type = input.required<PropertyType | PropertyInputType>();
  key = input.required<string | number | symbol>();
  filter2Word = filter2Word;

  options = computed(() => {
    const type = this.type();
    if (type === 'number') {
      return ['lt', 'gt', 'lte', 'gte', 'equal'];
    } else if (type === 'date') {
      return ['lt', 'gt', 'lte', 'gte', 'equal'];
    } else if (type === 'text') {
      return ['contains', 'startsWith', 'endsWith', 'equal'];
    } else if (type === 'boolean') {
      return ['equal'];
    }
    return ['equal'];
  });

  valueCtrl = new FormControl();
  optionCtrl = new FormControl();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.valueCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const q = JSON.parse(this.route.snapshot.queryParams['q'] ?? '{}');
      q[this.key() as string] = {
        [this.optionCtrl.value]: value,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          ...this.route.snapshot.queryParams, // Keep existing query parameters
          q: JSON.stringify(q), // Update the q parameter
        },
        queryParamsHandling: 'merge', // preserve the existing query parameters in the URL
      });
    });
  }

  getFilterName(option: string) {
    return this.filter2Word[option as keyof typeof filter2Word];
  }
}
