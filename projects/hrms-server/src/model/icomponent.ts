import { Signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface IDetailComponent<T> extends ControlValueAccessor {
  record: Signal<T>;
}
