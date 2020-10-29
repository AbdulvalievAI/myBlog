import { TestBed } from '@angular/core/testing';

import { SourceDataService } from './source-data.service';

describe('SourceDataService', () => {
  let service: SourceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
