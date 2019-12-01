import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvshowComponent } from './invshow.component';

describe('InvshowComponent', () => {
  let component: InvshowComponent;
  let fixture: ComponentFixture<InvshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
