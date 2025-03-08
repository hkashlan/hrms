import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IDetailComponent } from '@hrms-server/model/icomponent';
import { BaseValidateProperty } from '@hrms-server/model/property.z';

@Component({
  imports: [ReactiveFormsModule],
  template: `
    <textarea class="textarea" [formControl]="textControl" rows="7"></textarea>
  `,
})
export class OptionsComponent implements IDetailComponent<BaseValidateProperty> {
  record = input.required<BaseValidateProperty>();
  formControl = input.required<FormControl<string[] | null>>();

  textControl = new FormControl('');

  constructor() {
    this.textControl.valueChanges.subscribe((value) => {
      if (value) {
        const options = value.split('\n');
        this.formControl().setValue(options);
      } else {
        this.formControl().setValue(null);
      }
    });
  }
}
