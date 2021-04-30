import { TestBed } from '@angular/core/testing';

import { VrstaplacanjaService } from './vrstaplacanja.service';

describe('VrstaplacanjaService', () => {
  let service: VrstaplacanjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VrstaplacanjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
