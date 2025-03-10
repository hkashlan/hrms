import { Component, input, numberAttribute } from '@angular/core';
import { Folder } from '@hrms-server/db/schemas';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { folderInfo } from '../../../../entities/folder.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [DetailPageComponent],
  template: `
    <lib-detial-page [id]="id()" [config]="config" />
  `,
})
export class FolderDetailComponent {
  id = input(undefined, { transform: numberAttribute });
  config: DetailPageConfig<Folder> = {
    entity: folderInfo,
    update: trpc.entities.folders.update.mutate,
    create: trpc.entities.folders.create.mutate,
    getById: trpc.entities.folders.getById.query,
  };
}
