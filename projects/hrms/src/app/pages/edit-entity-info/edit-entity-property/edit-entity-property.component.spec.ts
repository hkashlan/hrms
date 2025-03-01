import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntityPropertyComponent } from './edit-entity-property.component';

describe('EditEntityPropertyComponent', () => {
  let component: EditEntityPropertyComponent;
  let fixture: ComponentFixture<EditEntityPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEntityPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEntityPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
