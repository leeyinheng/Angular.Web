import { TestBed, inject } from '@angular/core/testing';

import { BcserviceService } from './bcservice.service';

describe('BcserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BcserviceService]
    });
  });

  it('should be created', inject([BcserviceService], (service: BcserviceService) => {
    expect(service).toBeTruthy();
  }));
});
