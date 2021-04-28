import { TestBed } from '@angular/core/testing';

import { ArtiklService } from './artikl.service';

describe('ArtiklService', () => {
  let service: ArtiklService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtiklService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
