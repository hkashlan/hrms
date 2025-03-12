import { Component, input, numberAttribute } from '@angular/core';
import { Media } from '@hrms-server/db/schemas';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { mediaInfo } from '../../../../entities/media.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  selector: 'app-media-detail',
  imports: [DetailPageComponent],
  template: `
    <lib-detial-page [id]="id()" [config]="config" />
  `,
})
export class MediaDetailComponent {
  id = input(undefined, { transform: numberAttribute });
  config: DetailPageConfig<Media> = {
    entity: mediaInfo,
    update: trpc.entities.medias.update.mutate,
    create: trpc.entities.medias.create.mutate,
    getById: trpc.entities.medias.getById.query,
  };
}
