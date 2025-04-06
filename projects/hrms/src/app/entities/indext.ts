import { Entity } from 'ui-kit';
import { AgeComponent } from '../pages/entities/user/detail/age/age.component';
import { trpc } from '../trpc.client';
import { blogInfo } from './blog.entity';
import { userInfo } from './user.entity';

userInfo.properties.age.hooks!.details!.component = AgeComponent;

export type EntityKeys = keyof typeof trpc.entities;
export const entityInfos: Record<EntityKeys, Entity<any>> = {
  //
  users: userInfo,
  blogs: blogInfo,
};
