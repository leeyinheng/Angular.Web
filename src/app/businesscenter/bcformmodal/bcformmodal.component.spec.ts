import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcformmodalComponent } from './bcformmodal.component';

describe('BcformmodalComponent', () => {
  let component: BcformmodalComponent;
  let fixture: ComponentFixture<BcformmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcformmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcformmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
