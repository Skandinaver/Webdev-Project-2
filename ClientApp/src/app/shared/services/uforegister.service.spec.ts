import { TestBed } from '@angular/core/testing';

import { UforegisterService } from './uforegister.service';

describe('UforegisterService', () => {
  let service: UforegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UforegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
