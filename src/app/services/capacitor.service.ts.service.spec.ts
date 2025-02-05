import { TestBed } from '@angular/core/testing';

import { CapacitorServiceTsService } from './capacitor.service.ts.service';

describe('CapacitorServiceTsService', () => {
  let service: CapacitorServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
