import { Component } from '@angular/core';
import { ListPageComponent } from 'ui-kit';
import { folderInfo } from '../../../../entities/folder.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [ListPageComponent],
  template: `
    <lib-list-page [entity]="folderInfo" [fn]="fn" />
  `,
})
export class FolderListComponent {
  folderInfo = folderInfo;
  fn = trpc.entities.folders.list.query;
}
