import { TestBed } from '@angular/core/testing';

import { PorezService } from './porez.service';

describe('PorezService', () => {
  let service: PorezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
