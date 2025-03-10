import { Component } from '@angular/core';
import { ListPageComponent } from 'ui-kit';
import { mediaInfo } from '../../../../entities/media.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [ListPageComponent],
  template: `
    <lib-list-page [entity]="mediaInfo" [fn]="fn" />
  `,
})
export class MediaListComponent {
  mediaInfo = mediaInfo;
  fn = trpc.entities.medias.list.query;
}
