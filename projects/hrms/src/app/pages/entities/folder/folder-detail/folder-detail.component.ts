import { Component, input, numberAttribute } from '@angular/core';
import { SubFolderListComponent } from './sub-folder-list/sub-folder-list.component';
import { SubMediaListComponent } from './sub-media-list/sub-media-list.component';

@Component({
  standalone: true,
  imports: [SubMediaListComponent, SubFolderListComponent],
  templateUrl: './folder-detail.component.html',
})
export class FolderDetailComponent {
  id = input(undefined, { transform: numberAttribute });
}
