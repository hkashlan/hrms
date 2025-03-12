import { Component, input, resource } from '@angular/core';
import { SafeUrlPipe } from 'ui-kit';
import { trpc } from '../../../../../trpc.client';

@Component({
  selector: 'app-sub-media-list',
  imports: [SafeUrlPipe],
  template: `
    <section>
      <h2 class="text-2xl font-semibold mb-4">Media</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (item of mediaResources.value(); track $index) {
          <div class="card w-full bg-base-100 shadow-xl">
            <figure>
              <iframe [src]="item.url | safeUrl" [attr.type]="item.mimeType">
                <p>Your browser does not support the object tag.</p>
              </iframe>
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.name }}</h2>
              <p>Another sample video.</p>
              <div class="card-actions justify-end">
                <button class="btn btn-secondary btn-sm">Play</button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class SubMediaListComponent {
  parentId = input<number | undefined>();
  mediaResources = resource({
    request: () => ({ parentId: this.parentId() }),
    loader: ({ request }) => {
      if (!request.parentId) {
        return trpc.entities.medias.list.query({});
      } else {
        return trpc.entities.medias.list.query({ folderId: { equals: request.parentId } });
      }
    },
  });
}
