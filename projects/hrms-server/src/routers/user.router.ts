import { userTableInfo } from '../db/schamas/users';
import { t } from '../trpc';
import { curd } from '../utils/route';

export const userRouter = t.router(curd(userTableInfo));
