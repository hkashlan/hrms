import { Blog, fullBlogSchema } from '@hrms-server/db/schemas/blogs.schema';
import { Entity, generateEntity } from 'ui-kit';

export const blogInfo: Entity<Blog> = generateEntity<Blog>({
  schema: fullBlogSchema,
  entity: {
    name: 'blogs',
    label: 'blog description',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      name: {
        type: 'text',
        label: 'title',
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
        hooks: {
          list: {
            hidden: true,
          },
          details: {
            hidden: true,
          },
        },
      },
      authorId: {
        type: 'autocomplete',
        label: 'author id',
        entity: 'blogs',
      },
    },
  },
});
