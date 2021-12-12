import { TestBed } from '@angular/core/testing';

import { StartPageService } from './start-page.service';

describe('StartPageService', () => {
  let service: StartPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
