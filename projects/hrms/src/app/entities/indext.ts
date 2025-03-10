import { mediaInfo } from './media.entity';
import { folderInfo } from './folder.entity';
import { Entity } from 'ui-kit';
import { trpc } from '../trpc.client';
import { blogInfo } from './blog.entity';
import { userInfo } from './user.entity';

export type EntityKeys = keyof typeof trpc.entities;
export const entityInfos: Record<EntityKeys, Entity<any>> = {
  //
  users: userInfo,
  blogs: blogInfo,
  folders: folderInfo,
  medias: mediaInfo,
};
