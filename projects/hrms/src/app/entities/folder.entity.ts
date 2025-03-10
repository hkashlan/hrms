import { Folder, fullFolderSchema } from '@hrms-server/db/schemas/folders.schema';
import { Entity, generateEntity } from 'ui-kit';

export const folderInfo: Entity<Folder> = generateEntity<Folder>({
  schema: fullFolderSchema,
  entity: {
    name: 'folders',
    label: 'folders',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      name: {
        type: 'text',
        label: 'folder name',
      },
      parentId: {
        type: 'autocomplete',
        label: 'parent folder',
        entity: 'folders',
      },
    },
  },
});
