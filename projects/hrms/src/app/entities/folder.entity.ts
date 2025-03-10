import { fullFolderSchema, Folder } from '@hrms-server/db/schemas/folders.schema';
import { Entity, generateEntity } from 'ui-kit';

export const folderInfo: Entity<Folder> = generateEntity<Folder>({
  schema: fullFolderSchema,
  entity: {
    name: 'folders',
    label: 'blog description',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      name: {
        type: 'text',
        label: 'folder name',
      },
    },
  },
});
