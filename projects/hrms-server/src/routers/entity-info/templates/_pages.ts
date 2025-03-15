import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { addToFileBeforeEndingWith, entityUtils, writeFile } from './_utils';

export async function pages(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);
  const name = singular;
  const listContent = listTemplate(schema);
  const listFilePath = `projects/hrms/src/app/pages/entities/${name}/${name}-list/${name}-list.component.ts`;
  await writeFile(listFilePath, listContent);
  const detailContent = detailTemplate(schema);
  const detailFilePath = `projects/hrms/src/app/pages/entities/${name}/${name}-detail/${name}-detail.component.ts`;
  await writeFile(detailFilePath, detailContent);
  await updateEntityInfos(schema);
}

function listTemplate(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);

  return `
import { Component } from '@angular/core';
import { ListPageComponent } from 'ui-kit';
import { ${singular}Info } from '../../../../entities/${singular}.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [ListPageComponent],
  template: \`
    <lib-list-page [entity]="${singular}Info" [fn]="fn" />
  \`,
})
export class ${capitalized}ListComponent {
  ${singular}Info = ${singular}Info;
  fn = trpc.entities.${singular}s.list.query;
}
  `;
}

function detailTemplate(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);

  return `
import { Component, input, numberAttribute } from '@angular/core';
import { ${capitalized} } from '@hrms-server/db/schemas';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { ${singular}Info } from '../../../../entities/${singular}.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [DetailPageComponent],
  template: \`
    <lib-detial-page [id]="id()" [config]="config" />
  \`,
})
export class ${capitalized}DetailComponent {
  id = input(undefined, { transform: numberAttribute });
  config: DetailPageConfig<${capitalized}> = {
    entity: ${singular}Info,
    update: trpc.entities.${singular}s.update.mutate,
    create: trpc.entities.${singular}s.create.mutate,
    getById: trpc.entities.${singular}s.getById.query,
  };
}

  `;
}

async function updateEntityInfos(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);
  const trpcRouterPath = 'projects/hrms/src/app/pages/entities/routes.ts';
  const importStatement = `
import { ${capitalized}DetailComponent } from './${singular}/${singular}-detail/${singular}-detail.component';
import { ${capitalized}ListComponent } from './${singular}/${singular}-list/${singular}-list.component';

  `;
  const routerEntry = `
    {
      path: '${singular}s/list',
      component: ${capitalized}ListComponent,
    },
    {
      path: '${singular}s/detail',
      component: ${capitalized}DetailComponent,
    },
    {
      path: '${singular}s/detail/:id',
      component: ${capitalized}DetailComponent,
    },
  `;

  await addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '];');
}
