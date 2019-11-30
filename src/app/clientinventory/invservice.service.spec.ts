import { TestBed } from '@angular/core/testing';

import { InvserviceService } from './invservice.service';

describe('InvserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvserviceService = TestBed.get(InvserviceService);
    expect(service).toBeTruthy();
  });
});
