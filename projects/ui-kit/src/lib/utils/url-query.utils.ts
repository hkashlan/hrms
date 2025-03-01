import { inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

export function urlQuery(queryName: string = 'q') {
  const route = inject(ActivatedRoute);
  return toSignal(
    route.queryParams.pipe(
      takeUntilDestroyed(),
      // You can add operators here if needed, e.g., map to extract a specific param
      map((params) => {
        const query = params[queryName] ?? '';
        return query ? JSON.parse(query) : {};
      }),
    ),
  );
}
