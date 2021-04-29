import { TestBed } from '@angular/core/testing';

import { StavkaService } from './stavka.service';

describe('StavkaService', () => {
  let service: StavkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StavkaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
