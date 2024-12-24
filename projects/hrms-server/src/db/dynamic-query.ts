/* eslint-disable @typescript-eslint/no-explicit-any */
// Function to apply filters to a Drizzle query

import { and, eq, gt, gte, ilike, lt, lte, or, SQL } from 'drizzle-orm';
import { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { Filter, FilterOperators } from './client-filters';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyColumnFilter(column: PgColumn<any>, condition: FilterOperators<any>): SQL {
  const conditions = [];

  for (const [operator, value] of Object.entries(condition)) {
    if (value === undefined) continue;

    switch (operator) {
      case 'lt':
        conditions.push(lt(column, value));
        break;
      case 'gt':
        conditions.push(gt(column, value));
        break;
      case 'lte':
        conditions.push(lte(column, value));
        break;
      case 'gte':
        conditions.push(gte(column, value));
        break;
      case 'equals':
        conditions.push(eq(column, value));
        break;
      case 'contains':
        conditions.push(ilike(column, `%${value}%`));
        break;
      case 'startsWith':
        conditions.push(ilike(column, `${value}%`));
        break;
      case 'endsWith':
        conditions.push(ilike(column, `%${value}`));
        break;
    }
  }

  return conditions.length > 1 ? and(...conditions)! : conditions[0];
}

// Recursive function to apply filters to a query
export function applyFilters<T>(
  table: PgTableWithColumns<any>,
  filters?: Filter<T>,
  andFilter = true,
): SQL | undefined {
  if (!filters) return;

  const andConditions: SQL[] = [];
  const orConditions: SQL[] = [];

  // Handle `and` and `or` conditions recursively
  if (filters.and) {
    filters.and.forEach((subFilter) => {
      andConditions.push(applyFilters(table, subFilter, true)!);
    });
  }
  if (filters.or) {
    filters.or.forEach((subFilter) => {
      orConditions.push(applyFilters(table, subFilter, false)!);
    });
  }

  // Apply individual field conditions
  for (const key in filters) {
    if (key === 'and' || key === 'or') continue;
    const condition = filters[key as keyof T];
    if (condition) {
      const columnFilter: SQL = applyColumnFilter(table[key], condition);
      if (columnFilter) {
        if (andFilter) {
          andConditions.push(columnFilter);
        } else {
          orConditions.push(columnFilter);
        }
      }
    }
  }

  // Apply `and` and `or` conditions to the query
  const conditions: SQL[] = [];
  if (andConditions.length > 0) {
    conditions.push(and(...andConditions)!);
  }
  if (orConditions.length > 0) {
    conditions.push(or(...orConditions)!);
  }

  return and(...conditions);
}
