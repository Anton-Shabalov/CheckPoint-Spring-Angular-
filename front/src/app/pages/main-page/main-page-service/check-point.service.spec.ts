import { TestBed } from '@angular/core/testing';

import { CheckPointService } from './check-point.service';

describe('RegistrationService', () => {
  let service: CheckPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
