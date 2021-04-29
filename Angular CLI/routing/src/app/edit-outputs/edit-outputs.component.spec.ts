import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutputsComponent } from './edit-outputs.component';

describe('EditOutputsComponent', () => {
  let component: EditOutputsComponent;
  let fixture: ComponentFixture<EditOutputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOutputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
