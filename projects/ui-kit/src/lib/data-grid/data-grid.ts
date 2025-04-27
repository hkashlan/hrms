export interface ActionButton<T> {
  icon?: string;
  label?: string;
  action: (row: T, index: number) => Promise<void> | void;
}
