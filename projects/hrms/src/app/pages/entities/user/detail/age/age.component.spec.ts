import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeComponent } from './age.component';

describe('AgeComponent', () => {
  let component: AgeComponent;
  let fixture: ComponentFixture<AgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
