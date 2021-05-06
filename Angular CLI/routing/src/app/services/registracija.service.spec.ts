import { TestBed } from '@angular/core/testing';

import { RegistracijaService } from './registracija.service';

describe('RegistracijaService', () => {
  let service: RegistracijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistracijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
