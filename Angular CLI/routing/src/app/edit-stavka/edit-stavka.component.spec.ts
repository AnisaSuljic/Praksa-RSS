import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStavkaComponent } from './edit-stavka.component';

describe('EditStavkaComponent', () => {
  let component: EditStavkaComponent;
  let fixture: ComponentFixture<EditStavkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStavkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStavkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
