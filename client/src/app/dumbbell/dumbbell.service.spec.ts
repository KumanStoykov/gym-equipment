import { TestBed } from '@angular/core/testing';

import { DumbbellService } from './dumbbell.service';

describe('DumbbellService', () => {
  let service: DumbbellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DumbbellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
