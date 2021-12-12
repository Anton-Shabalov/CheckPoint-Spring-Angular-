import { TestBed } from '@angular/core/testing';

import { GetPointsService } from './get-points.service';

describe('GetPointsService', () => {
  let service: GetPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
