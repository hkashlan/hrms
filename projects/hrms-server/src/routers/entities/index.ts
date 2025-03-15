import { router } from '../../trpc';
import { blogRouter } from './blog.router';
import { userRouter } from './user.router';

export const entitiesRouter = router({
  users: userRouter,
  blogs: blogRouter,
});
