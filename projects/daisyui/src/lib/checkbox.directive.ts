import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[duiCheckbox]',
})
export class CheckboxDirective implements OnInit {
  @Input() duiCheckbox:
    | 'checkbox-neutral'
    | 'checkbox-primary'
    | 'checkbox-secondary'
    | 'checkbox-accent'
    | 'checkbox-info'
    | 'checkbox-success'
    | 'checkbox-warning'
    | 'checkbox-error'
    | '' = 'checkbox-neutral';

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    const classes = ['checkbox', this.duiCheckbox || 'checkbox-neutral'];
    this.el.nativeElement.type = 'checkbox';
    classes.forEach((c) => this.renderer.addClass(this.el.nativeElement, c));
  }
}
