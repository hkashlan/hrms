import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[duiButton]',
})
export class ButtonDirective implements OnInit {
  @Input() responsive: boolean = true;
  @Input() outline: boolean = false;
  @Input() duiButton:
    | 'btn-neutral'
    | 'btn-primary'
    | 'btn-secondary'
    | 'btn-accent'
    | 'btn-info'
    | 'btn-success'
    | 'btn-warning'
    | 'btn-error' = 'btn-primary';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    const classes = ['btn'];
    if (this.outline) {
      classes.push('btn-outline');
    }
    if (this.responsive) {
      classes.push('btn-xs', 'sm:btn-sm', 'md:btn-md', 'lg:btn-lg', 'xl:btn-xl');
    }

    classes.push(`${this.duiButton}`);

    classes.forEach((c) => this.renderer.addClass(this.el.nativeElement, c));
  }
}
