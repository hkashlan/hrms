import { fullMediaSchema, Media } from '@hrms-server/db/schemas/medias.schema';
import { Entity, generateEntity } from 'ui-kit';

export const mediaInfo: Entity<Media> = generateEntity<Media>({
  schema: fullMediaSchema,
  entity: {
    name: 'medias',
    label: 'media description',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      name: {
        type: 'text',
        label: 'name',
      },
      url: {
        type: 'text',
        label: 'folder name',
      },
      mimeType: {
        type: 'text',
        label: 'folder name',
      },
      size: {
        type: 'number',
        label: 'folder name',
      },
    },
  },
});
