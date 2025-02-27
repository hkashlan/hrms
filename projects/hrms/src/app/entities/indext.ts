import { Entity } from 'ui-kit';
import { trpc } from '../trpc.client';
import { userInfo } from './user.entity';

export type EntityKeys = keyof typeof trpc.entities;
export const entityInfos: Record<EntityKeys, Entity<any>> = {
  //
  user: userInfo,
};
