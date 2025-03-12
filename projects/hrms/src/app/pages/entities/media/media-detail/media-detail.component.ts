import { Component, input, numberAttribute, output } from '@angular/core';
import { Media } from '@hrms-server/db/schemas';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { mediaInfo } from '../../../../entities/media.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  selector: 'app-media-detail',
  imports: [DetailPageComponent],
  template: `
    <lib-detial-page
      [id]="id()"
      [config]="config"
      (canceled)="canceled.emit()"
      (saved)="saved.emit($event)"
    />
  `,
})
export class MediaDetailComponent {
  id = input(undefined, { transform: numberAttribute });
  saved = output<Media | null>();
  canceled = output<void>();

  config: DetailPageConfig<Media> = {
    entity: mediaInfo,
    update: trpc.entities.medias.update.mutate,
    create: trpc.entities.medias.create.mutate,
    getById: trpc.entities.medias.getById.query,
  };
}
