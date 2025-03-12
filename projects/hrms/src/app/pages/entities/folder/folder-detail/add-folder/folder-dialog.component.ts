import { Component, Output, EventEmitter } from '@angular/core';
import { z } from 'zod';
import { DynamicFormComponent } from "../../../../../../../../ui-kit/src/lib/components/form/form.component";
import { Entity } from '../../../../../../../../ui-kit/src/model/entity';

interface FolderForm {
  folderName: string;
}

@Component({
  selector: 'app-folder-dialog',
  template: `
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2">Add Folder</h2>
      <lib-dynamic-form [entity]="folderEntity" (entityChanged)="handleFormData($event)"></lib-dynamic-form>
      <div class="flex justify-end">
        <button (click)="cancel()" class="mr-2 btn">Cancel</button>
        <button (click)="save()" class="btn btn-primary">Save</button>
      </div>
    </div>
  `,
  imports: [DynamicFormComponent, ],
})
export class FolderDialogComponent {
  folderName = '';
  @Output() folderNameSubmitted = new EventEmitter<string>();
  @Output() cancelClicked = new EventEmitter<void>();
  formData: FolderForm | null = null;

  folderEntity: Entity<FolderForm> = {
    label: 'Folder Form',
    name: 'folderForm',
    schema: z.object({
      folderName: z.string().min(1, 'Folder name is required'),
    }),
    properties: {
      folderName: {
        type: 'text',
        label: 'Folder Name',
        validation: z.string().min(1, 'Folder name is required'),
      },
    },
  };

  handleFormData(data: FolderForm | null) {
    this.formData = data;
    if (data) {
      this.folderName = data.folderName;
    }
  }

  save() {
    if (this.formData) {
      this.folderNameSubmitted.emit(this.folderName);
      this.folderName = '';
    }
  }

  cancel() {
    this.cancelClicked.emit();
  }
}