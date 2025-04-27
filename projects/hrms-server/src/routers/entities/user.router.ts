import { userTableInfo } from '@hrms-server/db/schemas/users.table-info';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const userRouter = t.router(curd(userTableInfo));
