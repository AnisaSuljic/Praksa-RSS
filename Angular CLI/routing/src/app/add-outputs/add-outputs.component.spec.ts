import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutputsComponent } from './add-outputs.component';

describe('AddOutputsComponent', () => {
  let component: AddOutputsComponent;
  let fixture: ComponentFixture<AddOutputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
