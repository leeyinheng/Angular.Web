import { TestBed } from '@angular/core/testing';

import { CryptserviceService } from './cryptservice.service';

describe('CryptserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptserviceService = TestBed.get(CryptserviceService);
    expect(service).toBeTruthy();
  });
});
