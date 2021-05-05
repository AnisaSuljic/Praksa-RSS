import { TestBed } from '@angular/core/testing';

import { JedinicamjereService } from './jedinicamjere.service';

describe('JedinicamjereService', () => {
  let service: JedinicamjereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JedinicamjereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
