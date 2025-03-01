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
import { DataGridComponent } from 'ui-kit';
import { ${schema.name}Info } from '../../../../entities/${schema.name}.entity';
import { trpc } from '../../../../trpc.client';
import { entityUrlResource } from '../../../../utils/entity-resource';

@Component({
  imports: [DataGridComponent],
  template: \`
    <lib-data-grid [entity]="${schema.name}Info" [data]="${plural}.value() ?? []" />
  \`,
})
export class ${capitalized}ListComponent {
  ${schema.name}Info = ${schema.name}Info;

  ${plural} = entityUrlResource(trpc.entities.${schema.name}.list.query);
}
  `;
}
function detailTemplate(schema: EntityWithValidation) {
  const { capitalized } = entityUtils(schema);

  return `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ${capitalized} } from '@hrms-server/db/schamas';
import { DynamicFormComponent, Entity } from 'ui-kit';
import { ${schema.name}Info } from '../../../../entities/${schema.name}.entity';

@Component({
  imports: [DynamicFormComponent, ReactiveFormsModule],
  template: \`
    <lib-dynamic-form [entity]="${schema.name}Info" [formControl]="${schema.name}Control" />
  \`,
})
export class ${capitalized}DetailComponent {
  ${schema.name}Info: Entity<${capitalized}> = ${schema.name}Info;
  ${schema.name}Control = new FormControl(null as ${capitalized} | null);
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
      path: '${schema.name}/detail/:id',
      component: ${capitalized}DetailComponent,
    },
  `;

  await addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '];');
}
