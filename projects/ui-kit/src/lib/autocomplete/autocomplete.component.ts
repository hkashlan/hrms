import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  resource,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
  textChangeSignal = this.textChanged();
  id = input.required<FormControl<number | null>>();
  name = input.required<FormControl<string | null>>();
  property = input.required<AutoCompleteProperty>();

  suggestions = resource({
    request: () => this.textChangeSignal(),
    loader: ({ request }) => this.fetchData(request),
  });

  selectedIndex = linkedSignal({
    source: this.suggestions.value,
    computation: () => -1,
  });
  destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.name()
        .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          this.searchControl.setValue(value ?? '', { emitEvent: false });
        });
    });
  }

  selectOption(option: OptionValue | undefined) {
    if (!option) return;
    this.resetSearch();
    this.id().setValue(option.id);
    this.name().setValue(option.name);
    this.searchControl.setValue(option.name, { emitEvent: false });
    this.searchControl.markAsPristine();
  }

  resetSearch() {
    this.searchControl.markAsPristine();
  }

  navigate(direction: number) {
    if (this.searchControl.pristine) return;

    const selectedIndex = Math.min(
      Math.max(this.selectedIndex() + direction, 0),
      this.suggestions.value()?.length ?? 0 - 1,
    );
    this.selectedIndex.set(selectedIndex);
  }

  hideDropdown() {
    setTimeout(() => this.resetSearch(), 200);
  }

  private textChanged(): Signal<string | null | undefined> {
    return toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)));
  }

  private fetchData(text: string | null | undefined) {
    if (text && !this.searchControl.pristine) {
      return trpc.entities[this.property().entity].list
        .query({
          name: { contains: text },
        })
        .then((res) => res.map((r) => ({ id: r.id, name: r.name }) as OptionValue));
    }
    return Promise.resolve([]) as Promise<OptionValue[]>;
  }
}
