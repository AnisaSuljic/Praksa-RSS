import { TestBed } from '@angular/core/testing';

import { ValutaService } from './valuta.service';

describe('ValutaService', () => {
  let service: ValutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
