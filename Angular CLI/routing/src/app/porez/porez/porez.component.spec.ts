import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorezComponent } from './porez.component';

describe('PorezComponent', () => {
  let component: PorezComponent;
  let fixture: ComponentFixture<PorezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorezComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
