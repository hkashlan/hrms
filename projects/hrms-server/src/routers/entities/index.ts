import { blogRouter } from './blog.router';
import { router } from '../../trpc';
import { userRouter } from './user.router';

export const entitiesRouter = router({
  user: userRouter,
  blog: blogRouter,
});
