import { Component } from '@angular/core';
import { Folder, Media } from '@hrms-server/db/schemas';
import { SafeUrlPipe } from 'ui-kit';
import { folderInfo } from '../../../../entities/folder.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [SafeUrlPipe],
  template: `
    <div class="p-4">
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Folders</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          @for (item of folders; track $index) {
            <div class="card w-full bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{{ item.name }}</h2>
                <p>Contains files and subfolders.</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary btn-sm">Open</button>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Media</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          @for (item of medias; track $index) {
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
    </div>
  `,
})
export class FolderListComponent {
  folderInfo = folderInfo;
  fn = trpc.entities.folders.list.query;

  folders: Folder[] = [
    {
      id: 1,
      name: 'Folder 1',
      parentId: null,
    },
    {
      id: 2,
      name: 'Folder 2',
      parentId: null,
    },
    {
      id: 3,
      name: 'Folder 3',
      parentId: null,
    },
  ];

  medias: Media[] = [
    {
      id: 1,
      folderId: 1,
      name: 'Image 1',
      url: 'https://placehold.co/400x225',
      mimeType: 'image/jpeg',
      size: 123456,
    },
    {
      id: 2,
      folderId: 1,
      name: 'Video 1',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      mimeType: 'video/mp4',
      size: 123456,
    },
    {
      id: 3,
      folderId: 1,
      name: 'pdf 2',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      mimeType: 'image/jpeg',
      size: 123456,
    },
  ];
}
