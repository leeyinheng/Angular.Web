import { TestBed } from '@angular/core/testing';

import { LinepairserviceService } from './linepairservice.service';

describe('LinepairserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinepairserviceService = TestBed.get(LinepairserviceService);
    expect(service).toBeTruthy();
  });
});
