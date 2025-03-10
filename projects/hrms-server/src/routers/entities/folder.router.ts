import { folderTableInfo } from '../../db/schemas/folders.schema';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const folderRouter = t.router(curd(folderTableInfo));
