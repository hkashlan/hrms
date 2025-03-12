import { Component, input, model, output } from '@angular/core';
import { z } from 'zod';
import { DynamicFormComponent } from '../../../../../../../../ui-kit/src/lib/components/form/form.component';
import { Entity } from '../../../../../../../../ui-kit/src/model/entity';
import { folderInfo } from './../../../../../entities/folder.entity';
import { trpc } from './../../../../../trpc.client';

interface FolderForm {
  folderName: string;
}

@Component({
  selector: 'app-folder-dialog',
  template: `
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2">Add Folder</h2>
      <lib-dynamic-form [entity]="folderEntity" (entityChanged)="handleFormData($event)" />
      <div class="flex justify-end">
        <button (click)="triggerActionDone(false)" class="mr-2 btn">Cancel</button>
        <button (click)="save()" [disabled]="!folderName()" class="btn btn-primary">Save</button>
      </div>
    </div>
  `,
  imports: [DynamicFormComponent],
})
export class FolderDialogComponent {
  parentId = input.required<number | undefined>();
  folderName = model<string | null>();
  id = input<number>();
  actionDone = output<boolean>();

  folderEntity: Entity<FolderForm> = {
    label: folderInfo.label,
    name: folderInfo.name,
    schema: z.object({
      folderName: folderInfo.properties.name.validation,
    }),
    properties: {
      folderName: folderInfo.properties.name,
    },
  };

  handleFormData(data: FolderForm | null) {
    this.folderName.set(data?.folderName);
  }

  save() {
    const id = this.id();
    if (id) {
      trpc.entities.folders.update
        .mutate({ id, name: this.folderName()!, parentId: this.parentId() })
        .then(() => {
          /// show snack bar
          this.triggerActionDone(true);
        });
    } else {
      trpc.entities.folders.create
        .mutate({ name: this.folderName()!, parentId: this.parentId() })
        .then(() => {
          /// show snack bar
          this.triggerActionDone(true);
        });
    }
  }

  triggerActionDone(saved: boolean) {
    this.actionDone.emit(saved);
    this.folderName.set('');
  }
}
