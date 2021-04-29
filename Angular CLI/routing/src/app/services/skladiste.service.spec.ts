import { TestBed } from '@angular/core/testing';

import { SkladisteService } from './skladiste.service';

describe('SkladisteService', () => {
  let service: SkladisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkladisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
