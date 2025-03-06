import { Signal } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface IDetailComponent<T> {
  record: Signal<T>;
  formControl: Signal<FormControl>;
}
