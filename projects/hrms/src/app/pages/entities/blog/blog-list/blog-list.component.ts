import { Component } from '@angular/core';
import { ListPageComponent } from 'ui-kit';
import { blogInfo } from '../../../../entities/blog.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [ListPageComponent],
  template: `
    <lib-list-page [entity]="blogInfo" [fn]="fn" />
  `,
})
export class BlogListComponent {
  blogInfo = blogInfo;
  fn = trpc.entities.blog.list.query;
}
