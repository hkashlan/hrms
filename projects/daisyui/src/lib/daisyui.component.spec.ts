import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaisyuiComponent } from './daisyui.component';

describe('DaisyuiComponent', () => {
  let component: DaisyuiComponent;
  let fixture: ComponentFixture<DaisyuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaisyuiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaisyuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
