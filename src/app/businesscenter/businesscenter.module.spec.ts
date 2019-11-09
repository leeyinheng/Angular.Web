import { BusinesscenterModule } from './businesscenter.module';

describe('BusinesscenterModule', () => {
  let businesscenterModule: BusinesscenterModule;

  beforeEach(() => {
    businesscenterModule = new BusinesscenterModule();
  });

  it('should create an instance', () => {
    expect(businesscenterModule).toBeTruthy();
  });
});
