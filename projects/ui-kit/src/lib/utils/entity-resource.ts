import { resource } from '@angular/core';
import { urlQuery } from './url-query.utils';

export function entityUrlResource<T>(fn: (x: any) => Promise<T>) {
  const query = urlQuery();
  return resource({
    request: () => ({ query: query() }),
    loader: ({ request }) => fn(request.query),
  });
}


export function fetchEntity<T>(fn: (x: number) => Promise<T>) {
  const query = urlQuery();
  return fn(query());
}
