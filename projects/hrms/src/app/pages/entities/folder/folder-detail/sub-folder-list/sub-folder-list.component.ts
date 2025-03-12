import { Component, input, resource } from '@angular/core';
import { ButtonDirective } from 'daisyui';
import { FolderDialogComponent } from '../add-folder/folder-dialog.component';
import { trpc } from './../../../../../trpc.client';

@Component({
  selector: 'app-sub-folder-list',
  imports: [FolderDialogComponent, ButtonDirective],
  template: `
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">
        Folders
        <button class="btn" (click)="folderDlg.showModal()">add modal</button>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (item of folderResources.value(); track $index) {
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ item.name }}</h2>
              <p>Contains files and subfolders.</p>
              <div class="card-actions justify-end">
                <button [duiButton]="'btn-primary'">Open</button>
                <!-- <button [duiButton]="'btn-error'" (click)="deleteFolder(item.id, item.name)">delete</button> -->
                <button [duiButton]="'btn-error'" (click)="confirmDialog.showModal()">
                  delete
                </button>
                <dialog #confirmDialog class="modal">
                  <div class="modal-box">
                    <h3 class="font-bold text-lg">{{ item.name }}</h3>
                    <p class="py-4">{{ item.name }}</p>
                    <div class="modal-action">
                      <button class="btn btn-primary" (click)="deleteFolder(item.id)">Yes</button>
                      <button class="btn btn-error" (click)="confirmDialog.close()">No</button>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
    <dialog #folderDlg class="modal">
      <app-folder-dialog
        [parentId]="parentId()"
        (actionDone)="closeFolderDialog(folderDlg, $event)"
      />
    </dialog>
  `,
})
export class SubFolderListComponent {
  parentId = input<number | undefined>();

  folderResources = resource({
    request: () => ({ parentId: this.parentId() }),
    loader: ({ request }) => {
      if (!request.parentId) {
        return trpc.entities.folders.list.query({});
      } else {
        return trpc.entities.folders.list.query({
          parentId: { equals: request.parentId },
        });
      }
    },
  });

  closeFolderDialog(dlg: HTMLDialogElement, shouldRefresh: boolean) {
    dlg.close();
    if (shouldRefresh) {
      this.folderResources.reload();
    }
  }
  deleteFolder(id: number) {
    trpc.entities.folders.delete.mutate({ id }).then(() => {
      this.folderResources.reload();
    });
  }
}
