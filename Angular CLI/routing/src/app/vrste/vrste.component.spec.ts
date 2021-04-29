import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrsteComponent } from './vrste.component';

describe('VrsteComponent', () => {
  let component: VrsteComponent;
  let fixture: ComponentFixture<VrsteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrsteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrsteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
