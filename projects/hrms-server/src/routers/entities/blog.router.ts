import { blogTableInfo } from '../../db/schemas/blogs.schema';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const blogRouter = t.router(curd(blogTableInfo));
