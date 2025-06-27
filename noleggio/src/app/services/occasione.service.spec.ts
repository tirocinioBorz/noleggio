import { TestBed } from '@angular/core/testing';

import { OccasioneService } from './occasione.service';

describe('OccasioneService', () => {
  let service: OccasioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccasioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
