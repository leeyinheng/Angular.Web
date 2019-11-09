import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BclistComponent } from './bclist.component';

describe('BclistComponent', () => {
  let component: BclistComponent;
  let fixture: ComponentFixture<BclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
