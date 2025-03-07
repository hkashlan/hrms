import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { addToFileBeforeEndingWith, entityUtils, writeFile } from './_utils';

export async function pages(schema: EntityWithValidation) {
  const name = schema.name;
  const listContent = listTemplate(schema);
  const listFilePath = `projects/hrms/src/app/pages/entities/${name}/${name}-list/${name}-list.component.ts`;
  await writeFile(listFilePath, listContent);
  const detailContent = detailTemplate(schema);
  const detailFilePath = `projects/hrms/src/app/pages/entities/${name}/${name}-detail/${name}-detail.component.ts`;
  await writeFile(detailFilePath, detailContent);
  await updateEntityInfos(schema);
}

function listTemplate(schema: EntityWithValidation) {
  const { plural, capitalized } = entityUtils(schema);

  return `
import { Component } from '@angular/core';
import { ListPageComponent } from 'ui-kit';
import { ${schema.name}Info } from '../../../../entities/${schema.name}.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [ListPageComponent],
  template: \`
    <lib-list-page [entity]="${schema.name}Info" [fn]="fn" />
  \`,
})
export class ${capitalized}ListComponent {
  ${schema.name}Info = ${schema.name}Info;
  fn = trpc.entities.${schema.name}.list.query;
}
  `;
}

function detailTemplate(schema: EntityWithValidation) {
  const { capitalized } = entityUtils(schema);

  return `
import { Component, input, numberAttribute } from '@angular/core';
import { ${capitalized} } from '@hrms-server/db/schamas';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { ${schema.name}Info } from '../../../../entities/${schema.name}.entity';
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
    entity: ${schema.name}Info,
    update: trpc.entities.${schema.name}.update.mutate,
    create: trpc.entities.${schema.name}.create.mutate,
    getById: trpc.entities.${schema.name}.getById.query,
  };
}

  `;
}

async function updateEntityInfos(schema: EntityWithValidation) {
  const { capitalized } = entityUtils(schema);
  const trpcRouterPath = 'projects/hrms/src/app/pages/entities/routes.ts';
  const importStatement = `
import { ${capitalized}DetailComponent } from './${schema.name}/${schema.name}-detail/${schema.name}-detail.component';
import { ${capitalized}ListComponent } from './${schema.name}/${schema.name}-list/${schema.name}-list.component';

  `;
  const routerEntry = `
    {
      path: '${schema.name}/list',
      component: ${capitalized}ListComponent,
    },
    {
      path: '${schema.name}/detail',
      component: ${capitalized}DetailComponent,
    },
    {
      path: '${schema.name}/detail/:id',
      component: ${capitalized}DetailComponent,
    },
  `;

  await addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '];');
}
