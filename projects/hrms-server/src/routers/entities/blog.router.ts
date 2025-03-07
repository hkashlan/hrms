import { blogTableInfo } from '../../db/schamas/blogs.schema';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const blogRouter = t.router(curd(blogTableInfo));
