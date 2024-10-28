export type FilterOperators<T> = T extends number
  ? { lt?: T; gt?: T; lte?: T; gte?: T }
  : T extends string
    ? { contains?: T; startsWith?: T; endsWith?: T }
    : T extends boolean
      ? { equals?: T }
      : { equals?: T };

// Add the logical operators AND/OR
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type LogicOperators<T> = {
  and?: Filter<T>[];
  or?: Filter<T>[];
};

// Now create the filter type including the logical operators
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Filter<T = any> = LogicOperators<T> & {
  [K in keyof T]?: FilterOperators<T[K]>;
};
