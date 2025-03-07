import { Blog, fullBlogSchema } from '@hrms-server/db/schamas/blogs.schema';
import { Entity, generateEntity } from 'ui-kit';

export const blogInfo: Entity<Blog> = generateEntity<Blog>({
  schema: fullBlogSchema,
  entity: {
    name: 'blog',
    label: 'blog description',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      content: {
        type: 'text',
        label: 'firstname',
        hooks: {
          list: {
            noFilter: true,
          },
        },
      },
      authorName: {
        type: 'text',
        label: 'author name',
      },
      authorId: {
        type: 'number',
        label: 'author id',
        hooks: {
          list: {
            noFilter: true,
          },
        },
      },
    },
  },
});
