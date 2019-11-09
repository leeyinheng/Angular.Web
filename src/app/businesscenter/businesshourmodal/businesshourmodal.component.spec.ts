import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesshourmodalComponent } from './businesshourmodal.component';

describe('BusinesshourmodalComponent', () => {
  let component: BusinesshourmodalComponent;
  let fixture: ComponentFixture<BusinesshourmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesshourmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesshourmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
