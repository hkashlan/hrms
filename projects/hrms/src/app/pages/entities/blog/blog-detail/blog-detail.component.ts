import { Component, input, numberAttribute } from '@angular/core';
import { Blog } from '@hrms-server/db/schemas/blogs.schema';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { blogInfo } from '../../../../entities/blog.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [DetailPageComponent],
  template: `
    <lib-detial-page [id]="id()" [config]="config" />
  `,
})
export class BlogDetailComponent {
  id = input(undefined, { transform: numberAttribute });
  config: DetailPageConfig<Blog> = {
    entity: blogInfo,
    update: trpc.entities.blogs.update.mutate,
    create: trpc.entities.blogs.create.mutate,
    getById: trpc.entities.blogs.getById.query,
  };
}
