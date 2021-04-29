import { TestBed } from '@angular/core/testing';

import { VrstaService } from './vrsta.service';

describe('VrstaService', () => {
  let service: VrstaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VrstaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
