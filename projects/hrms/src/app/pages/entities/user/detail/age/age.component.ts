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
  formControl = input.required<FormControl<number>>();
}
