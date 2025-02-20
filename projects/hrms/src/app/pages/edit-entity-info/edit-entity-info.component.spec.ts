import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntityInfoComponent } from './edit-entity-info.component';

describe('EditEntityInfoComponent', () => {
  let component: EditEntityInfoComponent;
  let fixture: ComponentFixture<EditEntityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEntityInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEntityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
