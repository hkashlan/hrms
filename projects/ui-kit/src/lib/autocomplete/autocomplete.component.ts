import { Component, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionValue } from './autocomplete';

@Component({
  selector: 'app-autocomplete',
  imports: [ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements ControlValueAccessor {
  suggestions = input.required<OptionValue[]>();
  textChanged = output<string | null>();
  currentValue: OptionValue | null = null;
  onChange: (value: OptionValue) => void = () => {};
  //  search = signal<string>('');
  // @Output() valueChange = new EventEmitter<string>();

  searchControl = new FormControl('');
  filteredSuggestions: OptionValue[] = [];
  showSuggestions: boolean = false;

  constructor() {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.textChanged.emit(value));
  }
  writeValue(obj: OptionValue): void {
    this.selectOption(obj);
  }

  registerOnChange(fn: AutocompleteComponent['onChange']): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }

  selectOption(option: OptionValue) {
    this.onChange(option);
    this.resetSearch(option);
  }

  private resetSearch(option: OptionValue | null) {
    this.searchControl.setValue(option?.name ?? '', { emitEvent: false });
    this.filteredSuggestions = [];
    this.showSuggestions = false;
  }

  onBlur() {
    // Delay hiding suggestions to allow click event to fire
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }
}
