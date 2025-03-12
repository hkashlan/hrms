import { Component, input, resource, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteProperty } from '@hrms-server/model/property.z';
import { debounceTime } from 'rxjs/operators';
import { trpc } from '../../../../hrms/src/app/trpc.client';
import { OptionValue } from './autocomplete';

@Component({
  selector: 'app-autocomplete',
  imports: [ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  searchControl = new FormControl('');
  formControlId = input.required<FormControl<number | null>>();
  formControlName = input.required<FormControl<string | null>>();
  property = input.required<AutoCompleteProperty>();

  suggestions = resource({
    request: () => this.textChanged()(),
    loader: ({ request }) => this.fetchData(request),
  });

  //  search = signal<string>('');
  // @Output() valueChange = new EventEmitter<string>();

  showSuggestions: boolean = false;

  selectOption(option: OptionValue) {
    this.resetSearch();
    this.formControlId().setValue(option.id);
    this.formControlName().setValue(option.name);
    this.searchControl.setValue(option.name, { emitEvent: false });
  }

  private resetSearch() {
    this.showSuggestions = false;
  }

  onBlur() {
    // Delay hiding suggestions to allow click event to fire
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }

  private textChanged(): Signal<string | null | undefined> {
    return toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)));
  }

  private fetchData(text: string | null | undefined) {
    if (text && this.showSuggestions) {
      return trpc.entities[this.property().entity].list
        .query({
          name: { contains: text },
        })
        .then((res) => res.map((r) => ({ id: r.id, name: r.name }) as OptionValue));
    }
    return Promise.resolve([]) as Promise<OptionValue[]>;
  }
}
