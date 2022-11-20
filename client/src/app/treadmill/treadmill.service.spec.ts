import { TestBed } from '@angular/core/testing';

import { TreadmillService } from './treadmill.service';

describe('TreadmillService', () => {
  let service: TreadmillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreadmillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
