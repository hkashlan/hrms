import { mediaTableInfo } from '../../db/schemas/medias.schema';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const mediaRouter = t.router(curd(mediaTableInfo));
