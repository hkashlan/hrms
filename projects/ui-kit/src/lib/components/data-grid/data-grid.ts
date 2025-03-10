export interface ActionButton<T> {
  icon?: string;
  label?: string;
  action: (row: T) => Promise<void> | void;
}
