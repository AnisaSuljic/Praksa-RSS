import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInputsComponent } from './edit-inputs.component';

describe('EditInputsComponent', () => {
  let component: EditInputsComponent;
  let fixture: ComponentFixture<EditInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
