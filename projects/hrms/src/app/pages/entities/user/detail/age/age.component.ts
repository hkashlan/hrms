import { Component, forwardRef, input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { User } from '@hrms-server/db/schamas';
import { IDetailComponent } from './../../../../../../../../hrms-server/src/model/icomponent';

@Component({
  selector: 'app-age',
  imports: [ReactiveFormsModule],
  templateUrl: './age.component.html',
  styleUrl: './age.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeComponent),
      multi: true,
    },
  ],
})
export class AgeComponent implements IDetailComponent<User> {
  record = input.required<User>();
  ageControl = new FormControl<number | null>(null);
  onChange = (value: number) => {};

  writeValue(obj: number): void {
    this.ageControl.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: AgeComponent['onChange']): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.ageControl.disable();
    } else {
      this.ageControl.enable();
    }
  }

  registerOnTouched(fn: any): void {}
}
