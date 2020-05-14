import { TestBed } from '@angular/core/testing';

import { TeagradeserviceService } from './teagradeservice.service';

describe('TeagradeserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeagradeserviceService = TestBed.get(TeagradeserviceService);
    expect(service).toBeTruthy();
  });
});
