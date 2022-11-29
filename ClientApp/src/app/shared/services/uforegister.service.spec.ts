import { TestBed } from '@angular/core/testing';
import { UFORegisterService } from './uforegister.service';

describe('UforegisterService', () => {
  let service: UFORegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UFORegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
