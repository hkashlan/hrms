import { Blog, fullBlogSchema } from '@hrms-server/db/schemas/blogs.schema';
import { Property } from '@hrms-server/model/property.z';
import { Entity, generateEntity } from 'ui-kit';

const t: Property = {
  type: 'autocomplete',
  label: 'title',
  entity: 'users',
  hooks: {
    list: {
      hideFilter: true,
    },
  },
};

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
            hideFilter: true,
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
        entity: 'users',
      },
    },
  },
});
