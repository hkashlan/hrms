import { Component, input, numberAttribute, resource } from '@angular/core';
import { SafeUrlPipe } from 'ui-kit';
import { trpc } from '../../../../trpc.client';
import { MediaDetailComponent } from '../../media/media-detail/media-detail.component';
import { FolderDialogComponent } from "./add-folder/folder-dialog.component";

@Component({
  imports: [SafeUrlPipe, MediaDetailComponent, FolderDialogComponent],
  template: `
    <div class="p-4">

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Folders</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          @for (item of folderResources.value(); track $index) {
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
        <h2 class="text-2xl font-semibold mb-4">Media <button class="btn" onclick="my_modal_1.showModal()">add modal</button></h2>
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
    </div>
    <dialog [open]="isModalOpen" class="modal">
      <app-media-detail />
      <button (click)="closeModal()">close</button>
    </dialog>
    <dialog [open]="isFolderDialogOpen" class="modal">
        <app-folder-dialog (folderNameSubmitted)="createFolder($event)" (cancelClicked)="closeFolderDialog()"></app-folder-dialog>
    </dialog>
  `,
})
export class FolderDetailComponent {
  id = input(undefined, { transform: numberAttribute });

  folderResources = resource({
    request: () => ({ id: this.id() }),
    loader: ({ request }) => {
      if (!request.id) {
        return trpc.entities.folders.list.query({});
      } else {
        return trpc.entities.folders.list.query({ parentId: { equals: request.id } });
      }
    },
  });

  mediaResources = resource({
    request: () => ({ id: this.id() }),
    loader: ({ request }) => {
      if (!request.id) {
        return trpc.entities.medias.list.query({});
      } else {
        return trpc.entities.medias.list.query({ folderId: { equals: request.id } });
      }
    },
  });
isModalOpen: any;
  isFolderDialogOpen: boolean = false;


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openFolderDialog() {
    this.isFolderDialogOpen = true;
  }

  closeFolderDialog() {
    this.isFolderDialogOpen = false;
  }

  createFolder(folderName: string) {
    trpc.entities.folders.create.mutate({ name: folderName, parentId: this.id() }).then(() => {

      this.closeFolderDialog();
    });
  }

  addFolder() {
    trpc.entities.folders.create.mutate({ name: 'sdfdsf', parentId: 1 }).then(() => {
      console.log('sdsdf');

    });
  }
}
