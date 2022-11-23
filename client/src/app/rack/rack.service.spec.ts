import { TestBed } from '@angular/core/testing';

import { RackService } from './rack.service';

describe('RackService', () => {
  let service: RackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
