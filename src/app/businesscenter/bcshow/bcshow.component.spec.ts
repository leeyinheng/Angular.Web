import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcshowComponent } from './bcshow.component';

describe('BcshowComponent', () => {
  let component: BcshowComponent;
  let fixture: ComponentFixture<BcshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
