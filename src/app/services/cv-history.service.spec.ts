import { TestBed } from '@angular/core/testing';

import { CvHistoryService } from './cv-history.service';

describe('UserService', () => {
  let service: CvHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
