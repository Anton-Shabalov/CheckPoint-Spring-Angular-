import { TestBed } from '@angular/core/testing';

import { DeleteAllPointsService } from './delete-all-points.service';

describe('DeleteAllPointsService', () => {
  let service: DeleteAllPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAllPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
